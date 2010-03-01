function GBL_PrivateBrowsingListener() { this.init(); }

GBL_PrivateBrowsingListener.prototype = {
	_os: null,
	_inPrivateBrowsing: false, // whether we are in private browsing mode
	_watcher: null, // the watcher object
	
	init : function ()
	{
		this._inited = true;
		this._os = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
		this._os.addObserver(this, "private-browsing", false);
		this._os.addObserver(this, "quit-application", false);
		try {
			var pbs = Components.classes["@mozilla.org/privatebrowsing;1"].getService(Components.interfaces.nsIPrivateBrowsingService);
			this._inPrivateBrowsing = pbs.privateBrowsingEnabled;
		} catch(ex) {
			// ignore exceptions in older versions of Firefox
		}
	},
	
	observe : function (aSubject, aTopic, aData)
	{
		if (aTopic == "private-browsing")
		{
			if (aData == "enter")
			{
				this._inPrivateBrowsing = true;
				if (this.watcher && "onEnterPrivateBrowsing" in this._watcher)
					this.watcher.onEnterPrivateBrowsing();
			}
			else if (aData == "exit")
			{
				this._inPrivateBrowsing = false;
				if (this.watcher && "onExitPrivateBrowsing" in this._watcher)
					this.watcher.onExitPrivateBrowsing();
			}
		}
		else if (aTopic == "quit-application")
		{
			this._os.removeObserver(this, "quit-application");
			this._os.removeObserver(this, "private-browsing");
		}
	},
	
	get inPrivateBrowsing()
	{
		return this._inPrivateBrowsing;
	},
	
	get watcher()
	{
		return this._watcher;
	},
	
	set watcher(val)
	{
		this._watcher = val;
	}
};

var objGooglebarLite = {
	Clipboard : Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard),
	ConsoleService : Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService),
	Finder : Components.classes['@mozilla.org/embedcomp/rangefind;1'].createInstance().QueryInterface(Components.interfaces.nsIFind),
	FormHistory : Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory2 || Components.interfaces.nsIFormHistory),
	PrefBranch : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("googlebar_lite."),
	Sound : Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound),
	Transferable : Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable),
	
	// ==================== Preference Names ====================
	// General preference names
	PrefName_SiteToUse			: "site_to_use",
	PrefName_ClickSelectsAll	: "click_selects_all",
	PrefName_SearchInTab		: "search_in_tab", // Open results in a new tab
	PrefName_RememberCombined	: "remember_combined",
	PrefName_SearchOnDragDrop	: "search_on_drag_drop",
	PrefName_WarnOnFormHistory	: "warn_on_form_history",
	PrefName_MaintainHistory	: "maintain_history",
	PrefName_EnableAutoComplete : "enable_auto_complete",
	PrefName_UseInlineComplete	: "use_inline_complete",
	PrefName_AutoSearch			: "auto_search", // Auto search when selecting from history
	PrefName_PromptToClear		: "prompt_to_clear",
	PrefName_IgnoreAnswers		: "ignore_answers",
	
	// Toolbar buttons preference names
	PrefName_TB_ShowLabels	: "buttons.showlabels",
	PrefName_TB_Up			: "buttons.up",
	PrefName_TB_Highlighter : "buttons.highlighter",
	PrefName_TB_SearchWords	: "buttons.searchwords",
	PrefName_TB_Combined	: "buttons.combined",
	PrefName_TB_Web			: "buttons.web",
	PrefName_TB_Lucky		: "buttons.lucky",
	PrefName_TB_Site		: "buttons.site",
	PrefName_TB_Images		: "buttons.images",
	PrefName_TB_Video		: "buttons.video",
	PrefName_TB_News		: "buttons.news",
	PrefName_TB_Maps		: "buttons.maps",
	PrefName_TB_Shopping	: "buttons.shopping",
	PrefName_TB_Groups		: "buttons.groups",
	PrefName_TB_Blog		: "buttons.blog",
	PrefName_TB_Book		: "buttons.book",
	PrefName_TB_Finance		: "buttons.finance",
	PrefName_TB_Scholar		: "buttons.scholar",
	PrefName_TB_Answers		: "buttons.answers",
	
	// Keyboard shortcuts preference names
	PrefName_FocusKey			: "focus_key",
	PrefName_ShiftSearch		: "shift_search",
	PrefName_CtrlSearch			: "ctrl_search",
	PrefName_ShiftCtrlSearch	: "shift_ctrl_search",
	
	// Context menu preference names
	PrefName_CM_ShowContext	: "context.showcontext",
	PrefName_CM_Web			: "context.web",
	PrefName_CM_Site		: "context.site",
	PrefName_CM_Images		: "context.images",
	PrefName_CM_Video		: "context.video",
	PrefName_CM_Groups		: "context.groups",
	PrefName_CM_Maps		: "context.maps",
	PrefName_CM_Answers		: "context.answers",
	PrefName_CM_Backward	: "context.backward",
	PrefName_CM_Cached		: "context.cached",
	PrefName_CM_CachedLink	: "context.cachedlink",
	PrefName_CM_Similar		: "context.similar",
	PrefName_CM_Translate	: "context.translate",
	
	// ==================== Preference Values ====================
	// General preferences
	SiteToUse : "",
	ClickSelectsAll : false,
	SearchInTab : false,
	RememberCombined : false,
	SearchOnDragDrop : false,
	WarnOnFormHistory : false,
	MaintainHistory : false,
	EnableAutoComplete : false,
	UseInlineComplete : false,
	AutoSearch : false,
	PromptToClear : false,
	IgnoreAnswers : false,
	
	// Toolbar buttons preferences
	TB_ShowLabels : false,
	TB_ShowUp : false,
	TB_ShowHighlighter : false,
	TB_ShowSearchWords : false,
	TB_ShowCombined : false,
	TB_ShowWeb : false,
	TB_ShowLucky : false,
	TB_ShowSite : false,
	TB_ShowImages : false,
	TB_ShowVideo : false,
	TB_ShowNews : false,
	TB_ShowMaps : false,
	TB_ShowShopping : false,
	TB_ShowGroups : false,
	TB_ShowBlog : false,
	TB_ShowBook : false,
	TB_ShowFinance : false,
	TB_ShowScholar : false,
	TB_ShowAnswers : false,
	
	// Keyboard shortcut preferences
	FocusKey : "",
	ShiftSearch : "",
	CtrlSearch : "",
	ShiftCtrlSearch : "",

	// Context menu preferences
	CM_ShowContext : false,
	CM_Web : false,
	CM_Site : false,
	CM_Images : false,
	CM_Video : false,
	CM_Groups : false,
	CM_Maps : false,
	CM_Answers : false,
	CM_Backward : false,
	CM_Cached : false,
	CM_CachedLink : false,
	CM_Similar : false,
	CM_Translate : false,

	// ==================== Misc. Variables ====================
	LastHighlightedTerms : "",
	OriginalCustomizeDone : null,
	PBListener: null,
	RunOnce : false,

	StylesArray : new Array("-moz-image-region: rect(0px 32px 16px 16px);",
							"-moz-image-region: rect(0px 48px 16px 32px);",
							"-moz-image-region: rect(0px 64px 16px 48px);",
							"-moz-image-region: rect(0px 80px 16px 64px);",
							"-moz-image-region: rect(0px 96px 16px 80px);",
							"-moz-image-region: rect(0px 112px 16px 96px);"),

	HighlightColors : new Array("background: #FF0;", "background: #0FF;", "background: #0F0;",
								"background: #F0F;", "background: orange;", "background: dodgerblue;"),

	Listener : {
		QueryInterface: function(aIID)
		{
			if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
			aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
			aIID.equals(Components.interfaces.nsISupports))
			return this;
			throw Components.results.NS_NOINTERFACE;
		},
	
		onProgressChange: function (aWebProgress, aRequest, aCurSelfProgress, aMaxSelfProgress, aCurTotalProgress, aMaxTotalProgress) {},
		onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {},
		onSecurityChange: function(aWebProgress, aRequest, aState) {},
		onLinkIconAvailable: function(a) {},
		
		onStateChange: function (aWebProgress, aRequest, aStateFlags, aStatus)
		{
			if(aStateFlags & Components.interfaces.nsIWebProgressListener.STATE_STOP)
			{
				var hbutton = document.getElementById("GBL-TB-Highlighter");
				if(hbutton.checked == true)
					objGooglebarLite.AddHighlighting(null);
			}
		},
	
		onLocationChange: function(aProgress, aRequest, aLocation)
		{
			if (aLocation)
			{
				var terms = "";
				var url = objGooglebarLite.ConvertToURL(aLocation.spec);
	
				var urlHasHostProperty = null;
				try
				{
					if(url && url.host)
						urlHasHostProperty = true;
					else
						urlHasHostProperty = false;
				}
				catch (ex)
				{
					urlHasHostProperty = false;
				}
	
				// Only update the search terms if we're on a Google page
				if(url != null && urlHasHostProperty == true && url.scheme == "http" && /google/.test(url.host))
				{
					// For some reason, the nsIURL "query" property doesn't work on Google search result pages (possibly because of no
					// file extension in the URL?) So, I wrote my own function to grab the query portion of the URL.
					var urlQuery = objGooglebarLite.ExtractQuery(aLocation.spec);
					var queryParts = objGooglebarLite.ParseQueryString(urlQuery);
					for(var q in queryParts)
					{
						if(q == "q" || q == "as_q")
						{
							terms = queryParts[q];
							var searchTerms = objGooglebarLite.GetSearchTerms();
							if(searchTerms != terms)
								objGooglebarLite.SetSearchTerms(terms);
							break;
						}
					}
				}
	
				var searchSiteButton = document.getElementById("GBL-TB-Site");
				var searchSiteMenuItem = document.getElementById("GBL-TB-Combined-Site");
							
				// Disable the site search options under the following conditions:
				//  1. The URL is null
				//  2. The URL has no 'host' property
				//  3. The URL scheme is neither 'http' nor 'https'
				//  4. The URL does not contain 'google' in its host
	
				if (url == null || urlHasHostProperty == false || !(/https?/.test(url.scheme)) || /google/.test(url.host))
				{
					searchSiteButton.setAttribute("disabled", true);
					searchSiteMenuItem.setAttribute("disabled", true);
				}
				else
				{
					searchSiteButton.setAttribute("disabled", false);
					searchSiteMenuItem.setAttribute("disabled", false);
				}
	
				objGooglebarLite.UpdateUpMenu();
			}
		}
	},

	SearchObserver:	{
		getSupportedFlavours: function()
		{
			var flavours = new FlavourSet;
			flavours.appendFlavour("text/html");
			flavours.appendFlavour("text/unicode");
			return flavours;
		},
	
		onDragOver: function(event, flavour, session) {},
	
		onDrop: function(event, dropData, session)
		{
			if(!dropData || !dropData.data || dropData.data == "") { return; }
			var searchBox = document.getElementById("GBL-SearchBox");
			if(event.target != searchBox) { return; }
			objGooglebarLite.DragDropToSearchBox(event, dropData.data);
		}
	},

	Log: function(aMessage)
	{
		this.ConsoleService.logStringMessage('Googlebar_Lite: ' + aMessage);
	},
	
	About: function()
	{
		window.openDialog("chrome://googlebarlite/content/about.xul", "About Googlebar Lite", "centerscreen,chrome,modal");
	},

	AddHighlighting: function(win)
	{
		if(!win)
			win = window.content;
	
		var i=0; // Avoid multiple redeclaration warnings
	
		for(i=0; win.frames && i < win.frames.length; i++)
		{
			this.AddHighlighting(win.frames[i]);
		}
	
		var doc = win.document;
		if(!doc) { return; }
	
		var body = doc.body;
		if(!body) { return; }
	
		var terms = this.TrimString(this.GetSearchTerms());
		var termsArray = this.SplitTerms(terms);
		this.LastHighlightedTerms = terms; // Back up the highlighted terms
	
		var count = body.childNodes.length;
	
		for(i=0; i<termsArray.length; i++)
		{
			var term = termsArray[i];
			
			var span = doc.createElement("span");
			span.setAttribute("style", this.HighlightColors[i%6] + " color: #000; display: inline !important; font-size: inherit !important;");
			span.setAttribute("class", "GBL-Highlighted");
	
			var searchRange = doc.createRange();
			searchRange.setStart(body, 0);
			searchRange.setEnd(body, count);
	
			var start = doc.createRange();
			start.setStart(body, 0);
			start.setEnd(body, 0);
	
			var end = doc.createRange();
			end.setStart(body, count);
			end.setEnd(body, count);
	
			var result = null;
			while( (result = this.Finder.Find(term, searchRange, start, end)) )
			{
				var surround = span.cloneNode(true);
	
				var startContainer = result.startContainer;
				var startOffset = result.startOffset;
				var endOffset = result.endOffset;
	
				var docfrag = result.extractContents();
				var before = startContainer.splitText(startOffset);
				var parent = before.parentNode;
	
				surround.appendChild(docfrag);
				parent.insertBefore(surround, before);
	
				start = surround.ownerDocument.createRange();
				start.setStart(surround, surround.childNodes.length);
				start.setEnd(surround, surround.childNodes.length);
			}
		}
	},

	AddSearchWordButtons: function(term)
	{
		var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
		var highlighter = document.getElementById("GBL-TB-Highlighter");
		var overflowButton = document.getElementById("GBL-Overflow-Button");
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
		var stringBundle = document.getElementById("GBL-String-Bundle");
	
		var searchTerms = this.SplitTerms(term);
		var tempButton;
		var tempMenuItem;
	
		for(var i=0; i<searchTerms.length; i++)
		{
			var thisTerm = searchTerms[i];
	
			if(
			   thisTerm.search(/^(?:site|cache|link|related|info|filetype|safesearch|allintitle|intitle|allinurl|inurl):/) != -1 ||
			   thisTerm.search(/^OR$/) != -1 ||
			   thisTerm.search(/^-/) != -1
			  )
				continue; // Ignore this term
	
			// Escape all apostrophes to prevent XSS problems
			var safeTerm = thisTerm.replace(/'/g, "\\'");
			safeTerm = "\'" + safeTerm + "\'";
	
			tempButton = document.createElement("toolbarbutton");
			tempButton.setAttribute("label",  thisTerm);
			tempButton.setAttribute("collapsed", "false");
			tempButton.setAttribute("tooltiptext", stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm]));
			tempButton.setAttribute("oncommand", "objGooglebarLite.FindInPage(" + safeTerm + ", event)");
			tempButton.className = "GBL-TB-SearchWordButton";
	
			searchWordsContainer.appendChild(tempButton);
	
			tempMenuItem = document.createElement("menuitem");
			tempMenuItem.setAttribute("label",  thisTerm);
			tempMenuItem.setAttribute("collapsed", "true");
			tempMenuItem.setAttribute("tooltiptext", stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm]));
			tempMenuItem.setAttribute("oncommand", "objGooglebarLite.FindInPage(" + safeTerm + ", event)");
	
			if(highlighter.checked == true)
			{
				tempButton.setAttribute("style", this.StylesArray[i%6] + " !important");
				tempMenuItem.setAttribute("style", this.StylesArray[i%6] + " !important");
			}
	
			overflowMenu.appendChild(tempMenuItem);
		}
	
		this.Resize(null); // Fake a resize to overflow properly
	},

	BuildFunction: function(obj, method)
	{
		return function()
		{
			return method.apply(obj, arguments);
		}
	},
	
	BuildSearchURL: function(prefix, restrict, searchTerms)
	{
		var u = "";
		if(this.SiteToUse.length > 0)
			u = "http://" + prefix + this.SiteToUse.substr(3) + "/" + restrict;
		else
			u = "http://" + prefix + ".google.com/" + restrict;
	
		if(searchTerms.length > 0)
			u += "?q=" + searchTerms + "&ie=UTF-8";
	
		return u;
	},
	
	CheckButtonContainer: function()
	{
		var c = document.getElementById("GBL-Buttons");
		var reportedWidth = c.boxObject.width;
		var actualWidth = 0;
	
		for(var i=0; i<c.childNodes.length; i++)
		{
			if(c.childNodes[i].nodeName == "toolbarbutton" || c.childNodes[i].nodeName == "toolbarseparator")
			{
				if(c.childNodes[i].collapsed == false)
					actualWidth += c.childNodes[i].boxObject.width;
			}
		}
	
		// If the button container is too large, resize it appropriately
		if(actualWidth < reportedWidth)
			c.setAttribute("width", actualWidth);
	},

	CheckHighlighting: function()
	{
		var hbutton = document.getElementById("GBL-TB-Highlighter");
		
		var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
		if(searchWordsContainer.childNodes.length > 0)
			hbutton.setAttribute("disabled", false);
		else
			hbutton.setAttribute("disabled", true);
	},

	ClearHistory: function(flag)
	{
		if(flag == "false")
			return;
	
		this.FormHistory.removeEntriesForName("GBL-Search-History");
	
		this.SetSearchTerms(""); // Clear the search terms box and buttons
        
		var hb = document.getElementById("GBL-TB-Highlighter");
	
		if(hb.checked == true)
		{
			hb.checked = false;
			this.RemoveHighlighting(null);
		}
	},

	ClearHistoryPrompt: function()
	{
		if(this.PromptToClear)
			window.openDialog("chrome://googlebarlite/content/confirm.xul", "Clear Search History?", "centerscreen,chrome,modal");
		else
			this.ClearHistory(true);
	},
	
	CombinedSearch: function(event)
	{
		if(this.RememberCombined == true)
		{
			var type = document.getElementById("GBL-TB-Combined").getAttribute("searchType");
			this.PrepareSearch(event, type);
		}
		else
			this.PrepareSearch(event, 'web');
	},

	ConfigureKeyboardShortcuts: function()
	{
		var windowEnumeration = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser");
	
		// Loop through all open windows
		while(windowEnumeration.hasMoreElements())
		{
			var mainDocument = windowEnumeration.getNext().document;
			if(mainDocument)
			{
				var focusKey = mainDocument.getElementById("GBL-Focus-Key");
				focusKey.setAttribute("key", this.FocusKey);
			}
		}
	},
	
	ConvertTermsToURI: function(terms)
	{
		var termArray = new Array();
		termArray = terms.split(" ");
		var result = "";
	
		for(var i=0; i<termArray.length; i++)
		{
			if(i > 0) { result += "+"; }
			result += this.MakeSafe(termArray[i]);
		}
	
		return result;
	},

	ConvertToURL: function(url)
	{
		if (typeof url == "string")
		{
			var ioservice = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
			try
			{
				return ioservice.newURI(url, null, null);
			}
			catch (ex)
			{
				return null;
			}
		}
	
		return null;
	},
	
	DelayedStartup: function()
	{
		var navtoolbox = document.getElementById("navigator-toolbox");
		objGooglebarLite.OriginalCustomizeDone = navtoolbox.customizeDone;
		navtoolbox.customizeDone = objGooglebarLite.BuildFunction(this, objGooglebarLite.ToolboxCustomizeDone);

		var searchbox = document.getElementById("GBL-SearchBox");
		searchbox.addEventListener("popupshowing", objGooglebarLite.SearchContextOnPopupShowing, true);
		searchbox.addEventListener("dragdrop", objGooglebarLite.SearchBoxOnDrop, true); // Pre-FF 3.5
		searchbox.addEventListener("drop", objGooglebarLite.SearchBoxOnDrop, true); // FF 3.5+
	},

	DisableSearchHistory: function(neverShowAgain)
	{
		// Disable the Googlebar Lite search history option and make sure we update the search box
		this.PrefBranch.setBoolPref(this.PrefName_MaintainHistory, false);
		this.UpdateSearchBoxSettings();
	
		// Disable the dialog from being displayed if the user asked to do so
		if(neverShowAgain)
			this.PrefBranch.setBoolPref(this.PrefName_WarnOnFormHistory, false);
	},
	
	DragDropToSearchBox: function(event, data)
	{
		var d = window.content.document;
		var tempDiv = d.createElement("div");
		tempDiv.innerHTML = data;
	
		var searchTerms = this.GetTextContent(tempDiv);
		searchTerms = searchTerms.replace(/[\r\n]/g, '');
		searchTerms = this.TrimString(searchTerms);

		this.SetSearchTerms(searchTerms);
        
		if(this.SearchOnDragDrop)
		{
			var isEmpty = false;
			if(searchTerms.length == 0)
				isEmpty = true;

			var useTab = this.OpenInTab(event, false);
			this.Search(searchTerms, "web", isEmpty, useTab);
		}
	},
	
	EnableFormHistory: function(neverShowAgain)
	{
		var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("browser.");
	
		// Enable form history
		b.setBoolPref("formfill.enable", true);
	
		// Disable the dialog from being displayed if the user asked to do so
		if(neverShowAgain)
			this.PrefBranch.setBoolPref(this.PrefName_WarnOnFormHistory, false);
	},

	ExtractQuery: function(url)
	{
		if (/^[^?]+?\?(.*)/.test(url))
			return RegExp.$1;
		else if(/^[^#]+?#([^#]+)/.test(url)) // Test for an AJAX-style query if we didn't see the normal one
			return RegExp.$1;
		else
			return "";
	},

	// Reuse the find bar mechanisms in Firefox (we get a bunch of stuff for free that way)
	// Most of this function's code came from the Google toolbar
    FindInPage: function(term, e)
	{
		var findBar = document.defaultView.gFindBar;
		var shiftKey = e.shiftKey;
		var findObj;
		var cachedFindTerm;

		if ("_find" in findBar)
		{
			findObj = {
				find: function(t) {
					findBar._find(t);
				},
				findNext: function() {
					 findBar._findAgain(false);
				},
				findPrevious: function() {
					 findBar._findAgain(true);
				}
			};

			cachedFindTerm = getBrowser().fastFind.searchString;
		}
		else
		{
			findObj = findBar;
			cachedFindTerm = getBrowser().findString;
		}

		if (cachedFindTerm == term)
		{
			if(shiftKey)
				findObj.findPrevious();
			else
				findObj.findNext();
		}
		else
		{
			findObj.find(term);
			if(shiftKey)
				findObj.findPrevious();
		}
	},
	
	FixOldPrefs: function()
	{
		var temp = "";
	
		var oldName = "buttons.dictionary";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			temp = this.PrefBranch.getBoolPref(oldName);
			this.PrefBranch.setBoolPref(this.PrefName_TB_Answers, temp);
			this.TB_ShowAnswers = temp;
	
			try {
				this.PrefBranch.clearUserPref(oldName);
			} catch (e) {}
		}
	
		oldName = "ignore_definitions";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			temp = this.PrefBranch.getBoolPref(oldName);
			this.PrefBranch.setBoolPref(this.PrefName_IgnoreAnswers, temp);
			this.IgnoreAnswers = temp;
	
			try {
				this.PrefBranch.clearUserPref(oldName);
			} catch (e) {}
		}
	
		oldName = "context.define";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			temp = this.PrefBranch.getBoolPref(oldName);
			this.PrefBranch.setBoolPref(this.PrefName_CM_Answers, temp);
			this.CM_Answers = temp;
	
			try {
				this.PrefBranch.clearUsedPref(oldName);
			} catch (e) {}
		}
	
		oldName = "search_history";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			var history = this.PrefBranch.getComplexValue(oldName, Components.interfaces.nsISupportsString).data;
			var historyArray = new Array();
			historyArray = history.split("||");
	
			for(var i=0; i<historyArray.length; i++)
			{
				if(historyArray[i] != "")
					this.FormHistory.addEntry("GBL-Search-History", historyArray[i]);
			}
	
			try {
				this.PrefBranch.clearUserPref(oldName);
			} catch(e) {}
		}
	
		oldName = "max_history_size";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			try {
				this.PrefBranch.clearUserPref(oldName);
			} catch(e) {}
		}
	
		oldName = "preserve_history";
		if(this.PrefBranch.prefHasUserValue(oldName))
		{
			try {
				this.PrefBranch.clearUserPref(oldName);
			} catch(e) {}
		}
	
		// Since we have already loaded preferences, let's check for invalid values
		if(this.ShiftSearch == "dictionary" || this.ShiftSearch == "thesaurus")
			this.ShiftSearch = "answers";
	
		if(this.CtrlSearch == "dictionary" || this.CtrlSearch == "thesaurus")
			this.CtrlSearch = "answers";
	
		if(this.ShiftCtrlSearch == "dictionary" || this.ShiftCtrlSearch == "thesaurus")
			this.ShiftCtrlSearch = "answers";
	},

	GetSearchTerms: function()
	{
		return document.getElementById("GBL-SearchBox").value;
	},
	
	GetSearchType: function(event)
	{
		// Return the default value if the event is null
		if(!event)
			return "web";
		
		if(event.shiftKey)
		{
			if(event.ctrlKey)
				return this.ShiftCtrlSearch;
			else
				return this.ShiftSearch;
		}
	
		if(event.ctrlKey)
			return this.CtrlSearch;
	
		// Are we remembering the combined search type? If so, return that value
		if(this.RememberCombined == true)
			return document.getElementById("GBL-TB-Combined").getAttribute("searchType");
	
		return "web"; // Return the default if no search type modifiers were caught.
	},

	GetTextContent: function(node)
	{
		if(node.nodeType == Node.TEXT_NODE)
			return node.nodeValue;
		else
		{
			var str = "";
			for(var i=0; i < node.childNodes.length; i++)
			{
				if(node.childNodes[i].nodeName != "SCRIPT")
					str += this.GetTextContent(node.childNodes[i]);
			}
			return str;
		}
	},
	
	Help: function()
	{
		var newTab = getBrowser().addTab("http://www.borngeek.com/firefox/googlebarlite/doc/");
		getBrowser().selectedTab = newTab;
	},

	Init: function()
	{
		var mainItem = document.getElementById("GBL-Toolbar-MainItem");
	
		// Only initialize if the main toolbar item is present
		if(mainItem && objGooglebarLite.RunOnce == false)
		{
			objGooglebarLite.RunOnce = true;
			objGooglebarLite.Transferable.addDataFlavor("text/unicode");

			objGooglebarLite.PBListener = new GBL_PrivateBrowsingListener();
			objGooglebarLite.PBListener.watcher = {
				onEnterPrivateBrowsing : function() {
					// we have just entered private browsing mode!
				},

				onExitPrivateBrowsing : function() {
					 // we have just left private browsing mode!
					 objGooglebarLite.SetSearchTerms("");
				}
			};
	
			window.getBrowser().addProgressListener(objGooglebarLite.Listener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
	
			setTimeout(objGooglebarLite.DelayedStartup, 50); // Needs to happen after Firefox's delayedStartup()
	
			// Load the preferences that are stored
			objGooglebarLite.LoadPrefs();
	
			objGooglebarLite.FixOldPrefs(); // Clean up deprecated preferences
			objGooglebarLite.ConfigureKeyboardShortcuts();
			objGooglebarLite.UpdateButtons();
			objGooglebarLite.UpdateContextMenuVisibility();
			objGooglebarLite.UpdateSearchBoxSettings();
			objGooglebarLite.UpdateUpMenu();

			if(window.opener != null)
			{
				var osb = window.opener.document.getElementById("GBL-SearchBox");
				objGooglebarLite.SetSearchTerms(osb.value);
			}
	
			setTimeout(objGooglebarLite.ValidateSearchHistorySetting, 50);
		}
	},

	LoadPrefs: function()
	{
		var b = this.PrefBranch;
	
		// General Preferences
		this.SiteToUse			= b.getComplexValue(this.PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString).data;
		this.ClickSelectsAll	= b.getBoolPref(this.PrefName_ClickSelectsAll);
		this.SearchInTab		= b.getBoolPref(this.PrefName_SearchInTab);
		this.RememberCombined	= b.getBoolPref(this.PrefName_RememberCombined);
		this.SearchOnDragDrop	= b.getBoolPref(this.PrefName_SearchOnDragDrop);
		this.WarnOnFormHistory	= b.getBoolPref(this.PrefName_WarnOnFormHistory);
		this.MaintainHistory	= b.getBoolPref(this.PrefName_MaintainHistory);
		this.EnableAutoComplete	= b.getBoolPref(this.PrefName_EnableAutoComplete);
		this.UseInlineComplete	= b.getBoolPref(this.PrefName_UseInlineComplete);
		this.AutoSearch 		= b.getBoolPref(this.PrefName_AutoSearch);
		this.PromptToClear 		= b.getBoolPref(this.PrefName_PromptToClear);
		this.IgnoreAnswers 		= b.getBoolPref(this.PrefName_IgnoreAnswers);
	
		// Toolbar button preferences
		this.TB_ShowLabels 		= b.getBoolPref(this.PrefName_TB_ShowLabels);
		this.TB_ShowUp 			= b.getBoolPref(this.PrefName_TB_Up);
		this.TB_ShowHighlighter = b.getBoolPref(this.PrefName_TB_Highlighter);
		this.TB_ShowSearchWords = b.getBoolPref(this.PrefName_TB_SearchWords);
		this.TB_ShowCombined 	= b.getBoolPref(this.PrefName_TB_Combined);
		this.TB_ShowWeb 		= b.getBoolPref(this.PrefName_TB_Web);
		this.TB_ShowLucky 		= b.getBoolPref(this.PrefName_TB_Lucky);
		this.TB_ShowSite 		= b.getBoolPref(this.PrefName_TB_Site);
		this.TB_ShowImages 		= b.getBoolPref(this.PrefName_TB_Images);
		this.TB_ShowVideo 		= b.getBoolPref(this.PrefName_TB_Video);
		this.TB_ShowNews 		= b.getBoolPref(this.PrefName_TB_News);
		this.TB_ShowMaps 		= b.getBoolPref(this.PrefName_TB_Maps);
		this.TB_ShowShopping	= b.getBoolPref(this.PrefName_TB_Shopping);
		this.TB_ShowGroups 		= b.getBoolPref(this.PrefName_TB_Groups);
		this.TB_ShowBlog 		= b.getBoolPref(this.PrefName_TB_Blog);
		this.TB_ShowBook 		= b.getBoolPref(this.PrefName_TB_Book);
		this.TB_ShowFinance		= b.getBoolPref(this.PrefName_TB_Finance);
		this.TB_ShowScholar		= b.getBoolPref(this.PrefName_TB_Scholar);
		this.TB_ShowAnswers 	= b.getBoolPref(this.PrefName_TB_Answers);
	
		// Search modifiers preferences
		this.FocusKey			= b.getCharPref(this.PrefName_FocusKey);
		this.ShiftSearch 		= b.getCharPref(this.PrefName_ShiftSearch);
		this.CtrlSearch 		= b.getCharPref(this.PrefName_CtrlSearch);
		this.ShiftCtrlSearch 	= b.getCharPref(this.PrefName_ShiftCtrlSearch);
	
		// Context menu preferences
		this.CM_ShowContext 	= b.getBoolPref(this.PrefName_CM_ShowContext);
		this.CM_Web 			= b.getBoolPref(this.PrefName_CM_Web);
		this.CM_Site			= b.getBoolPref(this.PrefName_CM_Site);
		this.CM_Images 			= b.getBoolPref(this.PrefName_CM_Images);
		this.CM_Video			= b.getBoolPref(this.PrefName_CM_Video);
		this.CM_Groups 			= b.getBoolPref(this.PrefName_CM_Groups);
		this.CM_Maps 			= b.getBoolPref(this.PrefName_CM_Maps);
		this.CM_Answers 		= b.getBoolPref(this.PrefName_CM_Answers);
		this.CM_Backward 		= b.getBoolPref(this.PrefName_CM_Backward);
		this.CM_Cached 			= b.getBoolPref(this.PrefName_CM_Cached);
		this.CM_CachedLink 		= b.getBoolPref(this.PrefName_CM_CachedLink);
		this.CM_Similar 		= b.getBoolPref(this.PrefName_CM_Similar);
		this.CM_Translate 		= b.getBoolPref(this.PrefName_CM_Translate);
	},
	
	LoadURL: function(url, openTab)
	{
		if(openTab)
		{
			var newTab = getBrowser().addTab(url);
			getBrowser().selectedTab = newTab;
		}
		else
		{
			window.content.document.location = url;
			window.content.focus();
		}
	},

	MakeSafe: function(term)
	{
		var safeTerm = encodeURIComponent(term);
		safeTerm = safeTerm.replace(/\'/g, '%27');
		return safeTerm;
	},
	
	OpenInTab: function(aEvent, allowAltKey)
	{
		if(aEvent == null)
			aEvent = { ctrlKey:false, altKey:false, button:0 };
	
		// If the search in tab option is checked, and we aren't viewing a blank window, open a new tab regardless
		if(window.content.document.location != "about:blank" && this.SearchInTab)
			return true;
	
		var alt = aEvent.altKey;
		var ctrl = aEvent.ctrlKey;
		var middle = false;
		if(aEvent.button && aEvent.button == 1)
			middle = true;
	
		// Only the search box passes in a true value for allowAltKey. This prevents a Ctrl+Enter search from the
		// search box from opening a custom search in a new tab.
		if(allowAltKey)
			return alt;
	
		if(ctrl || middle)
			return true;
	
		return false;
	},

	OpenOptions: function()
	{
		window.openDialog("chrome://googlebarlite/content/options.xul", "Googlebar Lite Options", "centerscreen,chrome,modal");
	},
	
	OptionsHaveUpdated: function()
	{
		this.LoadPrefs(); // Update our globals based on what got stored
	
		// Remove any highlighting that might be present (but only if the button is being hidden)
		var hb = document.getElementById("GBL-TB-Highlighter");
		if(hb.checked == true && this.TB_ShowHighlighter == false)
		{
			hb.checked = false;
			this.RemoveHighlighting(null);
			this.LastHighlightedTerms = ""; // Reset the backed up terms, just to be clean about it
			this.UpdateSearchWordButtons();
		}
	
		this.UpdateButtons();
		this.UpdateContextMenuVisibility();
		this.UpdateSearchBoxSettings();
		this.CheckButtonContainer();
		this.Resize(null); // Fake a resize to overflow properly
	
		this.ValidateSearchHistorySetting();
	},

	ParseQueryString: function(query)
	{
		var pieces = {};
		if(query)
		{
			// Strip any anchors (so they don't show up as search terms)
			query = query.replace(/#[^&]*$/, "");
			var pairs = query.split("&");
			for(var p in pairs)
			{
				var tokens = pairs[p].split("=");
				if(tokens)
				{
					var key = decodeURIComponent(tokens.shift().replace(/[+]/g, " "));
					pieces[key] = decodeURIComponent(tokens.join("=").replace(/[+]/g, " "));
				}
			}
		}
		return pieces;
	},

	PasteAndSearch: function()
	{
		this.Clipboard.getData(this.Transferable, this.Clipboard.kGlobalClipboard);
		
		var str = new Object();
		var strLength = new Object();
		
		this.Transferable.getTransferData("text/unicode", str, strLength);
	
		if(!str) return; // Exit if nothing there
	
		str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
		var pastetext = str.data.substring(0, strLength.value / 2);
		pastetext = this.TrimString(pastetext);
	
		if(pastetext.length == 0) return; // Exit if text is empty
	
		this.SetSearchTerms(pastetext);
	
		var useTab = false;
		if(window.content.document.location != "about:blank")
			useTab = this.SearchInTab;
	
		this.Search(pastetext, 'web', false, useTab);
	},

	PrepareMainMenu: function(event, searchType)
	{
		var useTab = this.OpenInTab(event, false);
		
		if(searchType == "gmail")
		{
			this.LoadURL("https://gmail.google.com/", useTab);
			return;
		}
	
		this.Search('', searchType, true, useTab);
	},
	
	PrepareSearch: function(event, searchType)
	{
		// Step 1: Get the search terms
		var searchTerms = this.TrimString(this.GetSearchTerms());
		var isEmpty = false;
	
		if(searchTerms.length == 0)
			isEmpty = true;
	
		// Step 2: Check the search type (if necessary)
		if(searchType == "")
			searchType = this.GetSearchType(event);
	
		// Step 3: Determine if we need to open search results in a new tab
		var useTab = this.OpenInTab(event, false);
		
		// Step 4: Perform the search
		this.Search(searchTerms, searchType, isEmpty, useTab);
	},

	PrepareCachedSearch: function(searchType)
	{
		var useTab = false;
	
		// Is the "always use tab" option checked? If so, set the useTab flag to true.
		if(window.content.document.location != "about:blank")
			useTab = this.SearchInTab;
		
		this.Search('', searchType, true, useTab);
	},

	PrepareSelectedSearch: function(aEvent, searchType)
	{
		// ****************************************
		// Step 1: Get the selected text
		// ****************************************
	
		var node = document.popupNode;
		var selection = "";
		var nodeLocalName = node.localName.toLowerCase();
	
		if((nodeLocalName == "textarea") || (nodeLocalName == "input" && node.type == "text"))
			selection = node.value.substring(node.selectionStart, node.selectionEnd);
		else
		{
			var focusedWindow = document.commandDispatcher.focusedWindow;
			selection = focusedWindow.getSelection().toString();
		}
	
		// Limit the selection length
		if(selection.length >= 150)
			selection = selection.substring(0, 149);
	
		// ****************************************
		// Step 2: Clean up the selected text
		// ****************************************
	
		selection = this.TrimString(selection); // Clean up whitespace
		
		var selArray = selection.split(" ");
		for(var i=0; i<selArray.length; i++)
		{
			selArray[i] = selArray[i].replace(/^(\&|\(|\)|\[|\]|\{|\}|\"|,|\.|!|\?|'|:|;)+/, "");
			selArray[i] = selArray[i].replace(/(\&|\(|\)|\[|\]|\{|\}|\"|,|\.|!|\?|'|:|;)+$/, "");
		}
	
		selection = selArray.join(" ");
	
		// ****************************************
		// Step 3: Update the search box and search word buttons
		// ****************************************
	
		this.SetSearchTerms(selection);
	
		// ****************************************
		// Step 4: Perform the search
		// ****************************************
	
		var useTab = this.OpenInTab(aEvent, false);
	
		this.Search(selection, searchType, false, useTab);
	},
	
	RemoveHighlighting: function(win)
	{
		// Remove highlighting.  We use the find API again rather than
		// searching for our span elements by id so that we gain access to the
		// anonymous content that nsIFind searches.
	
		if(!win)
			win = window.content;
	
		var i=0; // Avoid multiple redeclaration warnings
	
		for(i=0; win.frames && i < win.frames.length; i++)
		{
			this.RemoveHighlighting(win.frames[i]);
		}
	
		var doc = win.document;
		if(!doc) return;
		var body = doc.body;
		if(!body) return;
	
		var count = body.childNodes.length;
		var terms = this.LastHighlightedTerms; // Restore the previously backed up highlighted terms
		var termsArray = this.SplitTerms(terms);
	
		for(i=0; i<termsArray.length; i++)
		{
			var term = termsArray[i];
	
			var searchRange = doc.createRange();
			searchRange.setStart(body, 0);
			searchRange.setEnd(body, count);
	
			var startPt = doc.createRange();
			startPt.setStart(body, 0);
			startPt.setEnd(body, 0);
	
			var endPt = doc.createRange();
			endPt.setStart(body, count);
			endPt.setEnd(body, count);
	
			var retRange = null;
			while((retRange = this.Finder.Find(term, searchRange, startPt, endPt)))
			{
				var startContainer = retRange.startContainer;
				var elem = null;
				try { elem = startContainer.parentNode; } catch (e) { }
				if(elem)
				{
					// Avoid multiple redeclaration warnings
					var docfrag = null;
					var child = null;
					var next = null;
					var parent = null;
	
					if(elem.getAttribute("class") == "GBL-Highlighted")
					{
						docfrag = doc.createDocumentFragment();
						next = elem.nextSibling;
						parent = elem.parentNode;
	
						while((child = elem.firstChild)) {
							docfrag.appendChild(child);
						}
	
						startPt = doc.createRange();
						startPt.setStartAfter(elem);
	
						parent.removeChild(elem);
						parent.insertBefore(docfrag, next);
					}
					else
					{
						// For whatever reason, we did not highlight this instance (or it
						// appears that we did not). Let's walk up the DOM tree to see if
						// we can find a span higher up. This fixes a bug in GBL with
						// poorly coded HTML.
						try {
							while((elem = elem.parentNode))
							{
								if(elem.getAttribute("class") == "GBL-Highlighted")
								{
									docfrag = doc.createDocumentFragment();
									next = elem.nextSibling;
									parent = elem.parentNode;
	
									while((child = elem.firstChild)) {
										docfrag.appendChild(child);
									}
	
									startPt = doc.createRange();
									startPt.setStartAfter(elem);
	
									parent.removeChild(elem);
									parent.insertBefore(docfrag, next);
									break;
								}
							}
						} catch(e) {}
						startPt = doc.createRange();
						startPt.setStart(retRange.endContainer, retRange.endOffset);
					}
				}
				else
				{
					startPt = doc.createRange();
					startPt.setStart(retRange.endContainer, retRange.endOffset);
				}
	
				startPt.collapse(true);
			}
		}
	},

	RemoveListener: function()
	{
		window.getBrowser().removeProgressListener(objGooglebarLite.Listener);
	},

	Resize: function(event)
	{
		// Sizing issue hack (taken from patch for bug 266737)
		if(event && event.type == 'focus') 
			window.removeEventListener('focus', objGooglebarLite.Resize, false);
		
		var buttons = document.getElementById("GBL-TB-SearchWordsContainer");
		if(!buttons || !objGooglebarLite.TB_ShowSearchWords)
			return;
	
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
		var chevron = document.getElementById("GBL-Overflow-Button");
		var chevronWidth = 0;
		chevron.collapsed = false;
		chevronWidth = chevron.boxObject.width;
		chevron.collapsed = true;
	
		var available = window.innerWidth;
	
		// Sizing issue hack (taken from patch for bug 266737)
		if(available == 0)
			window.addEventListener('focus', objGooglebarLite.Resize, false);
	
		var overflowed = false;
	
		for(var i=0; i<buttons.childNodes.length; i++)
		{
			var button = buttons.childNodes[i];
			button.collapsed = overflowed;
	
			var offset = button.boxObject.x;
			if(offset + button.boxObject.width + chevronWidth > available)
			{
				overflowed = true;
				// This button doesn't fit, so show it in the menu and hide it in the toolbar.
				if(!button.collapsed)
					button.collapsed = true;
				if(chevron.collapsed)
					chevron.collapsed = false;
			}
		}
	},

	Search: function(searchTerms, searchType, isEmpty, useTab)
	{
		var win = window.content.document;
		var URL = "";
		var originalTerms = searchTerms;
		var canIgnore = false;	// True if doing an Answers.com search
	
		// ****************************************
		// Step 1: Convert the search terms into a URI capable string
		// ****************************************
		if(isEmpty == false)
			searchTerms = this.ConvertTermsToURI(searchTerms);
	
		// ****************************************
		// Step 2: Switch on the search type
		// ****************************************
	
		switch(searchType)
		{
		case "web":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms); }
			break;
	
		case "lucky":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms + "&btnI=I%27m+Feeling+Lucky"); }
			break;
	
		case "site":
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", "site:" + win.location.hostname + "+" + searchTerms); }
			break;
	
		case "images":
			if(isEmpty) { URL = this.BuildSearchURL("images", "", ""); }
			else		{ URL = this.BuildSearchURL("images", "images", searchTerms); }
			break;
	
		case "video":
			if(isEmpty) { URL = this.BuildSearchURL("video", "", ""); }
			else		{ URL = this.BuildSearchURL("video", "videosearch", searchTerms); }
			break;
	
		case "news":
			if(isEmpty) { URL = this.BuildSearchURL("news", "", ""); }
			else		{ URL = this.BuildSearchURL("news", "news", searchTerms); }
			break;
	
		case "maps":
			if(isEmpty) { URL = this.BuildSearchURL("maps", "", ""); }
			else		{ URL = this.BuildSearchURL("maps", "maps", searchTerms); }
			break;
	
		case "shopping":
			if(isEmpty) { URL = this.BuildSearchURL("www", "products", ""); }
			else		{ URL = this.BuildSearchURL("www", "products", searchTerms); }
			break;
	
		case "groups":
			if(isEmpty) { URL = this.BuildSearchURL("groups", "", ""); }
			else		{ URL = this.BuildSearchURL("groups", "groups", searchTerms); }
			break;
	
		case "blog":
			if(isEmpty) { URL = this.BuildSearchURL("blogsearch", "blogsearch", ""); }
			else		{ URL = this.BuildSearchURL("blogsearch", "blogsearch", searchTerms); }
			break;
	
		case "book":
			if(isEmpty) { URL = this.BuildSearchURL("www", "books", ""); }
			else		{ URL = this.BuildSearchURL("www", "books", searchTerms); }
			break;
	
		case "finance":
			if(isEmpty) { URL = this.BuildSearchURL("www", "finance", ""); }
			else		{ URL = this.BuildSearchURL("www", "finance", searchTerms); }
			break;
	
		case "scholar":
			if(isEmpty) { URL = this.BuildSearchURL("scholar", "", ""); }
			else		{ URL = this.BuildSearchURL("scholar", "scholar", searchTerms); }
			break;
	
		case "answers":
			canIgnore = true;
			if(isEmpty) { URL = "http://www.answers.com/"; }
			else		{ URL = "http://www.answers.com/" + searchTerms + "?gwp=13"; }
			break;
	
		// The following cases are only accessible through the context menu
		case "backwards":
			URL = this.BuildSearchURL("www", "search", "link:" + win.location.href);
			break;
	
		case "cached":
			URL = this.BuildSearchURL("www", "search", "cache:" + win.location.href);
			break;
	
		case "cachedlink":
			URL = this.BuildSearchURL("www", "search", "cache:" + gContextMenu.link);
			break;
	
		case "similar":
			URL = this.BuildSearchURL("www", "search", "related:" + win.location.href);
			break;
	
		case "translate":
			// Only uses .com (no country customization)
			URL = "http://translate.google.com/translate?u=" + win.location.href;
			break;
	
		// The following cases are only accessible through items on the GBL main menu
		case "advanced":
			URL = this.BuildSearchURL("www", "advanced_search", "");
			break;
	
		case "searchprefs":
			URL = this.BuildSearchURL("www", "preferences", "");
			break;
	
		case "languagetools":
			URL = this.BuildSearchURL("www", "language_tools", "");
			break;
	
		default:
			if(isEmpty) { URL = this.BuildSearchURL("www", "", ""); }
			else		{ URL = this.BuildSearchURL("www", "search", searchTerms); }
			break;
		}
	
		// ****************************************
		// Step 3: Add terms to search history
		// ****************************************
	
		if(this.MaintainHistory && !isEmpty && !(canIgnore && this.IgnoreAnswers))
			this.FormHistory.addEntry("GBL-Search-History", originalTerms);
	
		// ****************************************
		// Step 4: Perform search
		// ****************************************
	
		this.LoadURL(URL, useTab);
	},

	SearchBoxOnDrop: function(event)
	{
		nsDragAndDrop.drop(event, objGooglebarLite.SearchObserver);
	},

	SearchBoxTextEntered: function(aTriggeringEvent)
	{
		// Step 1: Get the search terms
		var terms = this.TrimString(this.GetSearchTerms());
		var isEmpty = (terms.length == 0);
	
		// Step 2: Do we need to open a new tab?
		var useTab = this.OpenInTab(aTriggeringEvent, true);
	
		// Step 3: Get the search type
		var searchType = this.GetSearchType(aTriggeringEvent);
	
		// Step 4: Search
		if(aTriggeringEvent != null || (aTriggeringEvent == null && this.AutoSearch))
			this.Search(terms, searchType, isEmpty, useTab);
	},

	SearchContextOnPopupShowing: function(e)
	{
		if(e.originalTarget.localName == "menupopup" && !document.getElementById("GBL-PasteAndSearch"))
		{
			var stringBundle = document.getElementById("GBL-String-Bundle");
	
			var mi = document.createElement("menuitem");
			mi.setAttribute("id", "GBL-PasteAndSearch");
			mi.setAttribute("label", stringBundle.getString("GBL_PasteAndSearch_Label"));
			mi.setAttribute("accesskey", stringBundle.getString("GBL_PasteAndSearch_AK"));
			mi.setAttribute("command", "GBL-Command-PasteAndSearch");
	
			var items = e.originalTarget.childNodes;
			for (var i=0; i<items.length; i++) {
				if(items[i].getAttribute("cmd") == "cmd_paste")
				{
					e.originalTarget.insertBefore(mi, items[i+1]);
					break;
				}
			}
		}
	
		var cmd = document.getElementById("GBL-Command-PasteAndSearch");
		var controller = document.commandDispatcher.getControllerForCommand("cmd_paste");
		var enabled = controller.isCommandEnabled("cmd_paste");
	
		// If the normal "Paste" command is disabled, let's disable ours too
		if(enabled)
			cmd.setAttribute("disabled", "false");
		else
			cmd.setAttribute("disabled", "true");
	},
	
	SetFocus: function(event)
	{
		var toolbar = document.getElementById("GBL-Toolbar");
		if(toolbar != null)
		{
			var searchBox = document.getElementById("GBL-SearchBox");
			if(searchBox != null && (!searchBox.parentNode || searchBox.parentNode.parentNode != toolbar || ! toolbar.collapsed))
				searchBox.focus();
		}
	},

	SetSearchTerms: function(terms)
	{
		var searchbox = document.getElementById("GBL-SearchBox");
		searchbox.value = terms;

		this.TermsHaveUpdated();
	},

	SplitTerms: function(searchwords)
	{
		var string = this.TrimString(searchwords);
		var buffer = "";
		var inQuotes = false;
		var inWord = false;
		var myArray = new Array();
		
		for(var i=0; i<string.length; i++)
		{
			var c = string.charAt(i);
			
			switch(c)
			{
			case ' ':
				if(inQuotes == false)
				{
					// Only push onto the array if the buffer isn't empty
					if(buffer != "")
					{
						myArray.push(buffer);
						buffer = "";
					}
					if(inWord == true)
						inWord = false;
				}
				else
					buffer += c;
				break;
	
			case '"':
				if(inQuotes == false)
				{
					inQuotes = true;
					inWord = true;
				}
				else
				{
					// We're coming out of quotes mode, so push the "word" onto the array and clear the buffer
					inQuotes = false;
					inWord = false;
	
					myArray.push(buffer);
					buffer = "";
				}
				break;
	
			case ',':
				break; // Ignore commas (regardless of where they are)
	
			case '+':
			case '~':
				if(inWord == false)
					break; // Ignore the ~ and + symbols that precede any search words
	
			default:
				if(inWord == false) 
					inWord = true;
				buffer += c;
			}
		}
		
		if(buffer != "")
			myArray.push(buffer);
		
		return myArray;
	},

	TermsHaveUpdated: function()
	{
		this.UpdateSearchWordButtons();
		this.CheckHighlighting();
	},
	
	ToggleHighlighting: function()
	{
		var hb = document.getElementById("GBL-TB-Highlighter");
	
		if(hb.checked == true)
		{
			hb.checked = false;
			this.RemoveHighlighting(null);
			this.LastHighlightedTerms = ""; // Reset the backed up terms, just to be clean about it
		}
		else
		{
			hb.checked = true;
			this.AddHighlighting(null);
		}
	
		this.UpdateSearchWordButtons();
	},
	
	ToggleToolbar: function()
	{
		var toolbar = document.getElementById("GBL-Toolbar");
		toolbar.collapsed = !toolbar.collapsed;
		document.persist("GBL-Toolbar", "collapsed");
	},

	ToolboxCustomizeDone: function(somethingChanged)
	{
		var mainItem = document.getElementById("GBL-Toolbar-MainItem");
	
		// Don't process anything if mainItem is null (the toolbar item has been dragged into the toolbox)
		if(mainItem && somethingChanged)
		{
			// We have to do all kinds of initialization in this case,
			// since we don't know the state from which the user is coming
	
			// Do "first time" initialization if necessary
			if(objGooglebarLite.RunOnce == false)
			{
				objGooglebarLite.RunOnce = true;
				window.getBrowser().addProgressListener(objGooglebarLite.Listener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
				setTimeout(objGooglebarLite.DelayedStartup, 1); // Needs to happen after Firefox's delayedStartup()
			}
	
			// Do some generic initialization
			objGooglebarLite.OptionsHaveUpdated();
			objGooglebarLite.UpdateUpMenu();
			
			// Clear the search words every time to avoid a weird auto-selection bug with search history
			// Also clears search word buttons
			objGooglebarLite.SetSearchTerms("");
		}
		else if(mainItem && !somethingChanged)
			objGooglebarLite.SetSearchTerms(""); // Prevent zombie search word buttons from appearing
	
		this.objGooglebarLite.OriginalCustomizeDone(somethingChanged);
	},
	
	TrimString: function(string)
	{
		if (!string) return "";
	
		// Efficiently replace leading and trailing white space
		string = string.replace(/^\s+/, '');
		string = string.replace(/\s+$/, '');
	
		// Replace all whitespace runs with a single space
		string = string.replace(/\s+/g, ' ');
	
		return string;
	},

	Up: function(event, path)
	{
		var useTab = this.OpenInTab(event, false);
	
		// Path is empty if the user clicks the up button
		if(path == "")
		{
			var upMenu = document.getElementById("GBL-TB-UpMenu");
	
			if(upMenu && upMenu.childNodes.length > 0)
				this.LoadURL(upMenu.childNodes.item(0).getAttribute("label"), useTab);
		}
		else
			this.LoadURL(path, useTab);
	},

	UpdateButtons: function()
	{
		// Toolbar button variables
		var TB_Combined		= document.getElementById("GBL-TB-Combined");
		var TB_Web			= document.getElementById("GBL-TB-Web");
		var TB_Lucky		= document.getElementById("GBL-TB-Lucky");
		var TB_Site 		= document.getElementById("GBL-TB-Site");
		var TB_Images		= document.getElementById("GBL-TB-Images");
		var TB_Video		= document.getElementById("GBL-TB-Video");
		var TB_News			= document.getElementById("GBL-TB-News");
		var TB_Maps			= document.getElementById("GBL-TB-Maps");
		var TB_Shopping		= document.getElementById("GBL-TB-Shopping");
		var TB_Groups		= document.getElementById("GBL-TB-Groups");
		var TB_Blog			= document.getElementById("GBL-TB-Blog");
		var TB_Book			= document.getElementById("GBL-TB-Book");
		var TB_Finance		= document.getElementById("GBL-TB-Finance");
		var TB_Scholar		= document.getElementById("GBL-TB-Scholar");
		var TB_Answers		= document.getElementById("GBL-TB-Answers");
		var TB_Up			= document.getElementById("GBL-TB-UpButton");
		var TB_Highlighter	= document.getElementById("GBL-TB-Highlighter");
		var TB_SWContainer	= document.getElementById("GBL-TB-SearchWordsContainer");
	
		// Separator variables
		var TB_Sep1			= document.getElementById("GBL-TB-Sep1");
		var TB_Sep2			= document.getElementById("GBL-TB-Sep2");
		var TB_Sep3			= document.getElementById("GBL-TB-Sep3");
	
		// Update the toolbar buttons
		TB_Combined.setAttribute("collapsed", !this.TB_ShowCombined);
		TB_Web.setAttribute("collapsed", !this.TB_ShowWeb);
		TB_Lucky.setAttribute("collapsed", !this.TB_ShowLucky);
		TB_Site.setAttribute("collapsed", !this.TB_ShowSite);
		TB_Images.setAttribute("collapsed", !this.TB_ShowImages);
		TB_Video.setAttribute("collapsed", !this.TB_ShowVideo);
		TB_News.setAttribute("collapsed", !this.TB_ShowNews);
		TB_Maps.setAttribute("collapsed", !this.TB_ShowMaps);
		TB_Shopping.setAttribute("collapsed", !this.TB_ShowShopping);
		TB_Groups.setAttribute("collapsed", !this.TB_ShowGroups);
		TB_Blog.setAttribute("collapsed", !this.TB_ShowBlog);
		TB_Book.setAttribute("collapsed", !this.TB_ShowBook);
		TB_Finance.setAttribute("collapsed", !this.TB_ShowFinance);
		TB_Scholar.setAttribute("collapsed", !this.TB_ShowScholar);
		TB_Answers.setAttribute("collapsed", !this.TB_ShowAnswers);
		
		TB_Up.setAttribute("collapsed", !this.TB_ShowUp);
		TB_Highlighter.setAttribute("collapsed", !this.TB_ShowHighlighter);
		TB_SWContainer.setAttribute("collapsed", !this.TB_ShowSearchWords);
	
		// Update the separators on the toolbar
		// Set hidden (not collapsed) on the separators since collapsed elements don't have their margins collapsed (bug #90616)
		TB_Sep1.setAttribute("hidden", !this.TB_ShowCombined);
		TB_Sep2.setAttribute("hidden", !(this.TB_ShowWeb || this.TB_ShowLucky || this.TB_ShowSite ||
										 this.TB_ShowImages || this.TB_ShowVideo || this.TB_ShowNews ||
										 this.TB_ShowMaps || this.TB_ShowGroups || this.TB_ShowBlog ||
										 this.TB_ShowBook || this.TB_ShowScholar || this.TB_ShowAnswers ||
										 this.TB_ShowFinance || this.TB_ShowShopping)); 
	
		TB_Sep3.setAttribute("hidden", !(this.TB_ShowUp || this.TB_ShowHighlighter));
		
		// Reset the button icon if the remember combined search type option is turned off
		if(this.RememberCombined == false)
			TB_Combined.setAttribute("searchType", "web");
	
		// Set button labels as necessary
		if(this.TB_ShowLabels == true)
		{
			var stringBundle = document.getElementById("GBL-String-Bundle");
			TB_Combined.setAttribute("label", stringBundle.getString("GBL_TB_Combined_Label"));
			TB_Up.setAttribute("label", stringBundle.getString("GBL_TB_Up_Label"));
			TB_Highlighter.setAttribute("label", stringBundle.getString("GBL_TB_Highlighter_Label"));
		}
		else
		{
			TB_Combined.setAttribute("label", "");
			TB_Up.setAttribute("label", "");
			TB_Highlighter.setAttribute("label", "");
		}
	},
	
	UpdateCombinedSearch: function(event, type)
	{
		if(this.RememberCombined == true)
		{
			var TB_Combined = document.getElementById("GBL-TB-Combined");
			TB_Combined.setAttribute("searchType", type);
		}
	
		this.PrepareSearch(event, type);
	},

	UpdateContextMenu: function()
	{
		// Grab the context menu items
		var conWeb = document.getElementById("GBL-Context-Web");
		var conSite = document.getElementById("GBL-Context-Site");
		var conImages = document.getElementById("GBL-Context-Images");
		var conVideo = document.getElementById("GBL-Context-Video");
		var conGroups = document.getElementById("GBL-Context-Groups");
		var conMaps = document.getElementById("GBL-Context-Maps");
		var conAnswers = document.getElementById("GBL-Context-Answers");
		var conBackward = document.getElementById("GBL-Context-Backward");
		var conCached = document.getElementById("GBL-Context-Cached");
		var conCachedLink = document.getElementById("GBL-Context-CachedLink");
		var conSimilar = document.getElementById("GBL-Context-Similar");
		var conTranslate = document.getElementById("GBL-Context-Translate");
		var conSubSep = document.getElementById("GBL-Context-SubSeparator");
	
		// Set the collapsed attribute as necessary
		conWeb.setAttribute("collapsed", !this.CM_Web);
		conSite.setAttribute("collapsed", !this.CM_Site);
		conImages.setAttribute("collapsed", !this.CM_Images);
		conVideo.setAttribute("collapsed", !this.CM_Video);
		conGroups.setAttribute("collapsed", !this.CM_Groups);
		conMaps.setAttribute("collapsed", !this.CM_Maps);
		conAnswers.setAttribute("collapsed", !this.CM_Answers);
		conBackward.setAttribute("collapsed", !this.CM_Backward);
		conCached.setAttribute("collapsed", !this.CM_Cached);
		conCachedLink.setAttribute("collapsed", !this.CM_CachedLink);
		conSimilar.setAttribute("collapsed", !this.CM_Similar);
		conTranslate.setAttribute("collapsed", !this.CM_Translate);
	
		// Deal with the separator
		conSubSep.setAttribute("hidden", !(this.CM_Web || this.CM_Site || this.CM_Images ||
										   this.CM_Video || this.CM_Groups || this.CM_Maps || 
										   this.CM_Answers) || 
							   !(this.CM_Backward || this.CM_Cached || this.CM_CachedLink || 
								 this.CM_Similar || this.CM_Translate));
	
		var node = document.popupNode;
		var selection = "";
		var nodeLocalName = node.localName.toLowerCase();
		if((nodeLocalName == "textarea") || (nodeLocalName == "input" && node.type == "text"))
			selection = node.value.substring(node.selectionStart, node.selectionEnd);
		else
		{
			var focusedWindow = document.commandDispatcher.focusedWindow;
			selection = focusedWindow.getSelection().toString();
		}
	
		// Update the selected text search items
		if(selection.length == 0)
		{
			conWeb.setAttribute("disabled", "true");
			conSite.setAttribute("disabled", "true");
			conImages.setAttribute("disabled", "true");
			conVideo.setAttribute("disabled", "true");
			conGroups.setAttribute("disabled", "true");
			conMaps.setAttribute("disabled", "true");
			conAnswers.setAttribute("disabled", "true");
		}
		else
		{
			conWeb.setAttribute("disabled", "false");
			conSite.setAttribute("disabled", "false");
			conImages.setAttribute("disabled", "false");
			conVideo.setAttribute("disabled", "false");
			conGroups.setAttribute("disabled", "false");
			conMaps.setAttribute("disabled", "false");
			conAnswers.setAttribute("disabled", "false");
		}
	
		// Update all of the web-page specific menu items
		var url = this.ConvertToURL(window.content.document.location.href);
	
		if(url == null || url.scheme == "file" || url.scheme == "about")
		{
			conBackward.setAttribute("disabled", "true");
			conCached.setAttribute("disabled", "true");
			conSimilar.setAttribute("disabled", "true");
			conTranslate.setAttribute("disabled", "true");
		}
		else
		{
			conBackward.setAttribute("disabled", "false");
			conCached.setAttribute("disabled", "false");
			conSimilar.setAttribute("disabled", "false");
			conTranslate.setAttribute("disabled", "false");
		}
	
		if(!gContextMenu.onLink || (/^file:/i.test(gContextMenu.link)) || (/^about:/i.test(gContextMenu.link)))
			conCachedLink.setAttribute("disabled", "true");
		else
			conCachedLink.setAttribute("disabled", "false");
	
	},

	UpdateContextMenuVisibility: function()
	{
		var conMenu = document.getElementById("GBL-Context-Menu");
		var conSep = document.getElementById("GBL-Context-Separator");
	
		conMenu.setAttribute("collapsed", !this.CM_ShowContext);
		conSep.setAttribute("hidden", !this.CM_ShowContext);
	},
	
	UpdateOverflowMenu: function()
	{
		var buttons = document.getElementById("GBL-TB-SearchWordsContainer");
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
	
		for(var i=0; i<buttons.childNodes.length; i++)
		{
			var button = buttons.childNodes[i];
			var menu = overflowMenu.childNodes[i];
			if(menu.collapsed == button.collapsed)
				menu.collapsed = !menu.collapsed;
		}
	},

	UpdateSearchBoxSettings: function()
	{
		var searchBox = document.getElementById("GBL-SearchBox");
		
		searchBox.setAttribute("enablehistory", this.MaintainHistory);
	
		if(this.MaintainHistory)
		{
			searchBox.setAttribute("completedefaultindex", this.UseInlineComplete);
			searchBox.setAttribute("disableautocomplete", !this.EnableAutoComplete);
		}
		else
		{
			searchBox.setAttribute("completedefaultindex", false);
			searchBox.setAttribute("disableautocomplete", true);
		}

		searchBox.clickSelectsAll = this.ClickSelectsAll;
	},
	
	UpdateSearchWordButtons: function()
	{
		// Step 1: Clear existing search word buttons
		var i=0;
	
		var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
		for(i=searchWordsContainer.childNodes.length; i > 0; i--)
			searchWordsContainer.removeChild(searchWordsContainer.childNodes[0]);
	
		var overflowMenu = document.getElementById("GBL-Overflow-Menu");
		for(i=overflowMenu.childNodes.length; i > 0; i--)
			overflowMenu.removeChild(overflowMenu.childNodes[0]);

		// Step 2: Add the new search word buttons
		var terms = this.GetSearchTerms();
		this.AddSearchWordButtons(this.GetSearchTerms());
	},

	UpdateUpMenu: function()
	{
		var currentAddress = window.content.document.location.href;
	
		// Trim off the trailing slash if there is one
		if(currentAddress.charAt(currentAddress.length - 1) == "/")
			currentAddress = currentAddress.substring(0, currentAddress.length - 1); // only subtract 1 because of the way substring() works
	
		var addressArray = currentAddress.split("/");
		var upMenu = document.getElementById("GBL-TB-UpMenu");
	
		// Bail out if the addressArray is less than 3 in size (since it does not fit the xxx://yyy model)
		if(addressArray.length < 3)
		{
			document.getElementById("GBL-TB-UpButton").setAttribute("disabled", true);
			return;
		}
	
		var i=0; // Avoid multiple redeclaration warnings
	
		// Clean up what's currently in the up menu
		for(i=upMenu.childNodes.length - 1; i>=0; i--)
		{
			upMenu.removeChild(upMenu.childNodes.item(i));
		}
	
		var tempItem = null;
		var currentPath = "";
	
		for(i=(addressArray.length - 1); i > 2; i--)
		{
			// Prevent the erroneous "file:///" entry from appearing
			if(i == 3 && addressArray[0] == "file:")
				break;
			
			for(var j=0; j<i; j++)
			{
				currentPath += addressArray[j];
				currentPath += "/";
			}
	
			tempItem = document.createElement("menuitem");
			tempItem.setAttribute("label", currentPath);
			tempItem.setAttribute("oncommand", "objGooglebarLite.Up(event, '" + currentPath + "'); event.stopPropagation();");
			tempItem.setAttribute("onclick", "checkForMiddleClick(this, event); event.stopPropagation();");
			upMenu.appendChild(tempItem);
	
			currentPath = "";
		}
	
		var host = addressArray[2];
		var hostArray = host.split(".");
	
		if(hostArray.length >= 3 && (addressArray[0] == "http:" || addressArray[0] == "https:") && hostArray[0] != "www")
		{
			var topHost = addressArray[0] + "//www";
			for(i=1; i<hostArray.length; i++)
			{
				topHost += "." + hostArray[i];
			}
	
			topHost += "/";
			tempItem = document.createElement("menuitem");
			tempItem.setAttribute("label", topHost);
			tempItem.setAttribute("oncommand", "objGooglebarLite.Up(event, '" + topHost + "'); event.stopPropagation();");
			tempItem.setAttribute("onclick", "checkForMiddleClick(this, event); event.stopPropagation();");
			upMenu.appendChild(tempItem);
		}
	
		if(upMenu.childNodes.length > 0)
			document.getElementById("GBL-TB-UpButton").setAttribute("disabled", false);
		else
			document.getElementById("GBL-TB-UpButton").setAttribute("disabled", true);
	},

	ValidateSearchHistorySetting: function()
	{
		if(this.WarnOnFormHistory)
		{
			var b = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("browser.");
	
			// Only case we care about is where form history is disabled, and search history is enabled
			if(b.getBoolPref("formfill.enable") == false && this.PrefBranch.getBoolPref(this.PrefName_MaintainHistory) == true)
				window.openDialog("chrome://googlebarlite/content/formhistory.xul", 
								  "Warning: Form History", "centerscreen,chrome,modal");
		}
	}
};

window.addEventListener('load', objGooglebarLite.Init, false);
window.addEventListener('resize', objGooglebarLite.Resize, false);
window.addEventListener('unload', objGooglebarLite.RemoveListener, false);

