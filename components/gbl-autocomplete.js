// This code started life as the sample from the "How to implement a custom
// autocomplete search component" article at MDN:
// https://developer.mozilla.org/en-US/docs/How_to_implement_custom_autocomplete_search_component
// 
// It then morphed into a variant of the nsSearchSuggestions.js file from Firefox:
// http://mxr.mozilla.org/mozilla-release/source/toolkit/components/search/nsSearchSuggestions.js

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

const HTTP_OK                    = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;
const HTTP_BAD_GATEWAY           = 502;
const HTTP_SERVICE_UNAVAILABLE   = 503;

Cu.import('resource://gre/modules/XPCOMUtils.jsm');
Cu.import('resource://gre/modules/Services.jsm');
Cu.import('resource://gre/modules/devtools/Console.jsm');
Cu.import('resource://googlebarlite/gbl-common.js');

const CLASS_ID = Components.ID('7716e5e0-c9c0-11e3-9c1a-0800200c9a66');
const CLASS_NAME = "Googlebar Lite AutoComplete";
const CONTRACT_ID = '@mozilla.org/autocomplete/search;1?name=googlebar-lite-autocomplete';

/**
 * @constructor
 *
 * @implements {nsIAutoCompleteResult}
 *
 * @param {string} searchString
 * @param {number} searchResult
 * @param {number} defaultIndex
 * @param {string} errorDescription
 * @param {Array.<string>} results
 * @param {Array.<string>|null=} comments
 * @param {nsIAutocompleteResult} prevResult 
 */
function ProviderAutoCompleteResult(searchString, searchResult, defaultIndex, errorDescription, results, comments, prevResult)
{
	this._searchString = searchString;
	this._searchResult = searchResult;
	this._defaultIndex = defaultIndex;
	this._errorDescription = errorDescription;
	this._results = results;
	this._comments = comments;
	this._formHistResult = prevResult;
}

ProviderAutoCompleteResult.prototype = {
	_searchString: "",
	_searchResult: 0,
	_defaultIndex: 0,
	_errorDescription: "",
	_results: [],
	_comments: [],
	_formHistResult: null,

	/**
	* @return {string} the original search string
	*/
	get searchString() {
		return this._searchString;
	},

	/**
	* @return {number} the result code of this result object, either:
	*   RESULT_IGNORED   (invalid searchString)
	*   RESULT_FAILURE   (failure)
	*   RESULT_NOMATCH   (no matches found)
	*   RESULT_SUCCESS   (matches found)
	*/
	get searchResult() {
		return this._searchResult;
	},

	/**
	 * @return {number} the index of the default item that should be entered if
	 *   none is selected
	 */
	get defaultIndex() {
		return this._defaultIndex;
	},

	/**
	 * @return {string} description of the cause of a search failure
	 */
	get errorDescription() {
		return this._errorDescription;
	},

	/**
	 * @return {number} the number of matches
	 */
	get matchCount() {
		return this._results.length;
	},

	/**
	 * @return {string} the value of the result at the given index
	 */
	getValueAt: function(index) {
		return this._results[index];
	},

	/**
	 * @return {string} the comment of the result at the given index
	 */
	getCommentAt: function(index) {
		if (this._comments)
			return this._comments[index];
		else
			return '';
	},

	/**
	 * @return {string} the style hint for the result at the given index
	 */
	getStyleAt: function(index) {
		if (!this._comments || !this._comments[index])
			return null;  // not a category label, so no special styling

		if (index == 0)
			return 'suggestfirst';	// category label on first line of results

		return 'suggesthint';	// category label on any other line of results
	},

	/**
	 * Gets the image for the result at the given index
	 *
	 * @return {string} the URI to the image to display
	 */
	getImageAt : function (index) {
		return '';
	},

	/**
	 * Removes the value at the given index from the autocomplete results.
	 * If removeFromDb is set to true, the value should be removed from
	 * persistent storage as well.
	 */
	removeValueAt: function(index, removeFromDb) {
		if (removeFromDb && this._formHistResult && index < this._formHistResult.matchCount)
		{
			// Remove the entry from the form history database
			this._formHistResult.removeValueAt(index, true);
		}
		
		this._results.splice(index, 1);

		if (this._comments)
			this._comments.splice(index, 1);
	},

	getLabelAt: function(index) { return this._results[index];},

	QueryInterface: XPCOMUtils.generateQI([ Ci.nsIAutoCompleteResult ])
};


/**
 * @constructor
 *
 * @implements {nsIAutoCompleteSearch}
 */
function ProviderAutoCompleteSearch() {}

ProviderAutoCompleteSearch.prototype = {

	classID: CLASS_ID,
	classDescription : CLASS_NAME,
	contractID : CONTRACT_ID,
	
	// Holds autocomplete results from the form history service
	_formHistoryResult: null,
	
	// Holds the suggest server timeout timer
	_formHistoryTimer: null,
	
	// Maximum number of form history items to display. The total number of items ever displayed
	// is 10, so this leaves at most 10 - this value positions for search suggestions
	_historyLimit: 6,
	
	// The object implementing nsIAutoCompleteObserver that we notify when we have found results
	_listener: null,
	
	// Back off if we see this number of errors within the time specified
	_maxErrorsBeforeBackoff: 3,
	
	// Time after which we're allowed to try requesting again
	_nextRequestTime: 0,
	
	// The XMLHttpRequest object
	_request: null,
	
	// True if a request for remote suggestions was sent. This is used to differentiate between
	// the "_request is null because the request has already returned a result" and 
	// "_request is null because no request was sent" cases.
	_sentSuggestRequest: false,
	
	// Contains the timestamps of the last few backoff-triggering errors
	_serverErrorLog: [],
	
	// If we reach _maxErrorsBeforeBackoff within this time period, we'll trigger the backoff behavior
	_serverErrorPeriod: 600000, // 10 minutes
	
	// Current amount of time to wait before trying a server request after getting a backoff error
	_serverErrorTimeout: 0,
	
	// If we get another backoff error immediately after timeout, increase the backoff
	// to (2 * oldPeriod) + this value
	_serverErrorTimeoutIncrement: 60000, // 10 minutes
	
	get _suggestionLabel() {
		delete this._suggestionLabel;
		let bundle = Services.strings.createBundle("chrome://global/locale/search/search.properties");
		return this._suggestionLabel = bundle.GetStringFromName("suggestion_label");
	},
	
	// How long we should wait (in ms) before we give up on search suggestions and just
	// display local form history results
	_suggestionTimeout: 500,
	
	// Resets the backoff behavior
	_clearServerErrors: function()
	{
		this._serverErrorLog = [];
		this._serverErrorTimeout = 0;
		this._nextRequestTime = 0;
	},
	
	// Returns true if the status indicates a backoff-triggering error
	_isBackoffError: function(status)
	{
		return ((status == HTTP_INTERNAL_SERVER_ERROR) ||
				(status == HTTP_BAD_GATEWAY) ||
				(status == HTTP_SERVICE_UNAVAILABLE));
	},
	
	_noteServerError: function()
	{
		var currentTime = Date.now();
		
		this._serverErrorLog.push(currentTime);
		if(this._serverErrorLog.length > this._maxErrorsBeforeBackoff)
			this._serverErrorLog.shift();
		
		if((this._serverErrorLog.length == this._maxErrorsBeforeBackoff) &&
		   ((currentTime - this._serverErrorLog[0]) < this._serverErrorPeriod))
		{
			this._serverErrorTimeout = (this._serverErrorTimeout * 2) + this._serverErrorTimeoutIncrement;
			this._nextRequestTime = currentTime + this._serverErrorTimeout;
		}
	},
	
	_okToRequest: function()
	{
		return Date.now() > this._nextRequestTime;
	},
	
	// Called when the 'readyState' of the XMLHttpRequest changes
	_onReadyStateChange: function()
	{
		if(!this._request || this._request.readyState != this._request.DONE)
			return;
		
		try {
			var status = this._request.status;
		} catch (e) {
			return; // XMLHttpRequest can throw NS_ERROR_NOT_AVAILABLE
		}
		
		if (this._isBackoffError(status))
		{
			this._noteServerError();
			return;
		}
		
		var responseText = this._request.responseText;
		if(status != HTTP_OK || responseText == "")
			return;
		
		this._clearServerErrors();
		
		try {
			var serverResults = JSON.parse(responseText);
		} catch (ex) {
			Cu.reportError("Failed to parse JSON search-suggest response: " + ex);
			return;
		}
		
		var searchString = serverResults[0] || "";
		var results = serverResults[1] || [];
		
		var comments = [];
		var historyResults = [];
		var historyComments = [];
		
		if(this._formHistoryResult &&
		   (this._formHistoryResult.searchResult == Ci.nsIAutoCompleteResult.RESULT_SUCCESS))
		{
			var maxHistoryItems = Math.min(this._formHistoryResult.matchCount, this._historyLimit);
			for(var i=0; i<maxHistoryItems; i++)
			{
				var term = this._formHistoryResult.getValueAt(i);
				var dupIndex = results.indexOf(term);
				if(dupIndex != -1)
					results.splice(dupIndex, 1);
				
				historyResults.push(term);
				historyComments.push("");
			}
		}
		
		for (var i=0; i<results.length; i++)
		{
			comments.push("");
		}
		
		if (comments.length > 0)
			comments[0] = this._suggestionLabel;
		
		var finalResults = historyResults.concat(results);
		var finalComments = historyComments.concat(comments);
		
		this.onResultsReady(searchString, finalResults, finalComments, this._formHistoryResult);
		
		this._reset();
	},

	_reset: function()
	{
		if(!this._formHistoryTimer)
		{
			this._listener = null;
			this._formHistoryResult = null;
		}
		
		this._request = null;
	},
	
	// Send an autocompletion request to the form history service, which will result in
	// a call to the onSearchResults routine with the local history results
	_startHistorySearch: function(searchString, searchParam)
	{
		var formHistory = Cc["@mozilla.org/autocomplete/search;1?name=form-history"].createInstance(Ci.nsIAutoCompleteSearch);
		formHistory.startSearch(searchString, searchParam, this._formHistoryResult, this);
	},
	
	notify: function(timer)
	{
		// FIXME: See bug 387341, and reference any fixes made for that in nsSearchSuggestions.js
		this._formHistoryTimer = null;
		
		if(!this._listener)
			return;
		
		this._listener.onSearchResult(this, this._formHistoryResult);
		this._reset();
	},
	
	// Notifies the front end that results are ready to display
	onResultsReady: function(searchString, results, comments, formHistoryResult)
	{
		if(this._listener)
		{
			var result = new ProviderAutoCompleteResult(searchString, Ci.nsIAutoCompleteResult.RESULT_SUCCESS,
														0, "", results, comments, formHistoryResult);
			this._listener.onSearchResult(this, result);
			this._listener = null;
		}
	},
	
	// Callback used by the form-history service to give us results
	onSearchResult: function(search, result)
	{
		this._formHistoryResult = result;
		
		if(this._request)
		{
			// There's still a pending request, so give it some time to finish
			this._formHistoryTimer = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
			this._formHistoryTimer.initWithCallback(this, this._suggestionTimeout, Ci.nsITimer.TYPE_ONE_SHOT);
		}
		else if (!this._sentSuggestRequest)
		{
			// No request was sent, so return the form history results
			this._listener.onSearchResult(this, this._formHistoryResult);
			this._reset();
		}
	},
	
	/** 
	 * Starts the search result gathering process. Part of the 
	 * nsIAutoCompleteSearch implementation.
	 *
	 * @param searchString 		the string to search for
	 * @param searchParam 		an extra parameter
	 * @param previousResult 	a previous result to use for faster searchinig
	 * @param listener 			the listener to notify when the search is complete
	 */
	startSearch: function(searchString, searchParam, previousResult, listener)
	{
		if (!previousResult)
			this._formHistoryResult = null;
		
		// This is an ugly hack that comes from the official nsSearchSuggestions
		// file. We hijack the searchParam value through a binding to the search
		// box, and append a "|private" value if the search was performed in a
		// private window.
		var formHistorySearchParam = searchParam.split("|")[0];
		var privacyMode = (searchParam.split("|")[1] == "private");
		
		this.stopSearch(); // Stop any existing search requests
		
		this._listener = listener;
		
		if (!searchString || !GooglebarLiteCommon.Data.Prefs.EnableSearchSuggest.value || 
			!this._okToRequest())
		{
			// If we have an empty search string, search suggest is disabled, or
			// we're in backoff mode, just search local history
			this._sentSuggestRequest = false;
			this._startHistorySearch(searchString, formHistorySearchParam);
			return;
		}
		
		// Create the search request and send it
		this._request = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);
		var myself = this;
		
		this._request.open('GET', 'https://www.google.com/complete/search?client=firefox&q=' + encodeURIComponent(searchString), true);
		
		this._request.onreadystatechange = function() {
			myself._onReadyStateChange();
		};
		
		// Handle the private browsing case
		if(this._request.channel instanceof Ci.nsIPrivateBrowsingChannel)
			this._request.channel.setPrivate(privacyMode);
		
		// Handle proxy foolishness
		this._request.channel.notificationCallbacks = new AuthPromptOverride();
		this._request.send();
		
		// Search local history
		this._sentSuggestRequest = true;
		this._startHistorySearch(searchString, formHistorySearchParam);
	},

	/**
	 * Stops an asynchronous search that is in progress
	 */
	stopSearch: function()
	{
		if(this._request)
		{
			this._request.abort();
			this._reset();
		}
	},

	QueryInterface: XPCOMUtils.generateQI([ Ci.nsIAutoCompleteSearch ])
};

function AuthPromptOverride() {}

AuthPromptOverride.prototype = {
	// nsIAuthPromptProvider
	getAuthPrompt: function(reason, id)
	{
		return {
			promptAuth: function() {
				throw Cr.NS_ERROR_NOT_IMPLEMENTED;
			},
			asyncPromptAuth: function() {
				throw Cr.NS_ERROR_NOT_IMPLEMENTED;
			}
		};
	},
	
	// nsIInterfaceRequestor
	getInterface: function(iid)
	{
		return this.QueryInterface(iid);
	},
	
	// nsISupports
	QueryInterface: XPCOMUtils.generateQI([Ci.nsIAuthPromptProvider, Ci.nsIInterfaceRequestor])
};

// The following line is what XPCOM uses to create components
const NSGetFactory = XPCOMUtils.generateNSGetFactory([ ProviderAutoCompleteSearch ]);
