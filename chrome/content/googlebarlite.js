const GBL_ConsoleService = Components.classes['@mozilla.org/consoleservice;1'].getService(Components.interfaces.nsIConsoleService);
const GBL_Finder = Components.classes['@mozilla.org/embedcomp/rangefind;1'].createInstance().QueryInterface(Components.interfaces.nsIFind);
const GBL_History = Components.classes["@mozilla.org/satchel/form-history;1"].getService(Components.interfaces.nsIFormHistory2 || Components.interfaces.nsIFormHistory);
const GBL_PrefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
const GBL_Sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

const GBL_Clipboard = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
const GBL_Transferable = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
GBL_Transferable.addDataFlavor("text/unicode");

const GBL_Branch = GBL_PrefService.getBranch("googlebar_lite.");

// ==================== PREFERENCE NAMES ====================

// General preference names
var GBL_PrefName_SiteToUse			= "site_to_use";
var GBL_PrefName_ClickSelectsAll	= "click_selects_all";
var GBL_PrefName_SearchInTab		= "search_in_tab";
var GBL_PrefName_RememberCombined	= "remember_combined";
var GBL_PrefName_SearchOnDragDrop	= "search_on_drag_drop";
var GBL_PrefName_WarnOnFormHistory	= "warn_on_form_history";
var GBL_PrefName_MaintainHistory	= "maintain_history";
var GBL_PrefName_EnableAutoComplete = "enable_auto_complete";
var GBL_PrefName_UseInlineComplete	= "use_inline_complete";
var GBL_PrefName_AutoSearch			= "auto_search";
var GBL_PrefName_PromptToClear		= "prompt_to_clear";
var GBL_PrefName_IgnoreAnswers		= "ignore_answers";

// Hidden / advanced preference names
var GBL_PrefName_Sandbox = "use_sandbox";

// Toolbar buttons preference names
var GBL_PrefName_TB_ShowLabels	= "buttons.showlabels";
var GBL_PrefName_TB_Up			= "buttons.up";
var GBL_PrefName_TB_Highlighter = "buttons.highlighter";
var GBL_PrefName_TB_SearchWords	= "buttons.searchwords";
var GBL_PrefName_TB_Combined	= "buttons.combined";
var GBL_PrefName_TB_Web			= "buttons.web";
var GBL_PrefName_TB_Lucky		= "buttons.lucky";
var GBL_PrefName_TB_Site		= "buttons.site";
var GBL_PrefName_TB_Images		= "buttons.images";
var GBL_PrefName_TB_Video		= "buttons.video";
var GBL_PrefName_TB_News		= "buttons.news";
var GBL_PrefName_TB_Maps		= "buttons.maps";
var GBL_PrefName_TB_Shopping	= "buttons.shopping";
var GBL_PrefName_TB_Groups		= "buttons.groups";
var GBL_PrefName_TB_Blog		= "buttons.blog";
var GBL_PrefName_TB_Book		= "buttons.book";
var GBL_PrefName_TB_Finance		= "buttons.finance";
var GBL_PrefName_TB_Scholar		= "buttons.scholar";
var GBL_PrefName_TB_Answers		= "buttons.answers";

// Keyboard shortcuts preference names
var GBL_PrefName_FocusKey			= "focus_key";
var GBL_PrefName_ShiftSearch		= "shift_search";
var GBL_PrefName_CtrlSearch			= "ctrl_search";
var GBL_PrefName_ShiftCtrlSearch	= "shift_ctrl_search";

// Context menu preference names
var GBL_PrefName_CM_ShowContext	= "context.showcontext";
var GBL_PrefName_CM_Web			= "context.web";
var GBL_PrefName_CM_Site		= "context.site";
var GBL_PrefName_CM_Images		= "context.images";
var GBL_PrefName_CM_Video		= "context.video";
var GBL_PrefName_CM_Groups		= "context.groups";
var GBL_PrefName_CM_Maps		= "context.maps";
var GBL_PrefName_CM_Answers		= "context.answers";
var GBL_PrefName_CM_Backward	= "context.backward";
var GBL_PrefName_CM_Cached		= "context.cached";
var GBL_PrefName_CM_CachedLink	= "context.cachedlink";
var GBL_PrefName_CM_Similar		= "context.similar";
var GBL_PrefName_CM_Translate	= "context.translate";

// ==================== PREFERENCE VALUES ====================

// General preferences
var GBL_SiteToUse = "";
var GBL_ClickSelectsAll = false;
var GBL_SearchInTab = false;
var GBL_RememberCombined = false;
var GBL_SearchOnDragDrop = false;
var GBL_WarnOnFormHistory = false;
var GBL_MaintainHistory = false;
var GBL_EnableAutoComplete = false;
var GBL_UseInlineComplete = false;
var GBL_AutoSearch = false;
var GBL_PromptToClear = false;
var GBL_IgnoreAnswers = false;

// Hidden / advanced preferences
var GBL_Sandbox = false;

// Toolbar buttons preferences
var GBL_TB_ShowLabels = false;
var GBL_TB_ShowUp = false;
var GBL_TB_ShowHighlighter = false;
var GBL_TB_ShowSearchWords = false;
var GBL_TB_ShowCombined = false;
var GBL_TB_ShowWeb = false;
var GBL_TB_ShowLucky = false;
var GBL_TB_ShowSite = false;
var GBL_TB_ShowImages = false;
var GBL_TB_ShowVideo = false;
var GBL_TB_ShowNews = false;
var GBL_TB_ShowMaps = false;
var GBL_TB_ShowShopping = false;
var GBL_TB_ShowGroups = false;
var GBL_TB_ShowBlog = false;
var GBL_TB_ShowBook = false;
var GBL_TB_ShowFinance = false;
var GBL_TB_ShowScholar = false;
var GBL_TB_ShowAnswers = false;

// Keyboard shortcut preferences
var GBL_FocusKey = "";
var GBL_ShiftSearch = "";
var GBL_CtrlSearch = "";
var GBL_ShiftCtrlSearch = "";

// Context menu preferences
var GBL_CM_ShowContext = false;
var GBL_CM_Web = false;
var GBL_CM_Site = false;
var GBL_CM_Images = false;
var GBL_CM_Video = false;
var GBL_CM_Groups = false;
var GBL_CM_Maps = false;
var GBL_CM_Answers = false;
var GBL_CM_Backward = false;
var GBL_CM_Cached = false;
var GBL_CM_CachedLink = false;
var GBL_CM_Similar = false;
var GBL_CM_Translate = false;

// ==================== MISCELLANEOUS VARIABLES ====================

var GBL_IgnoreClick = false;
var GBL_IgnoreFocus = false;
var GBL_LastHighlightedTerms = "";
var GBL_OneTime = false;
var GBL_OriginalCustomizeDone = null;
var GBL_TermsSelected = false;

var GBL_StylesArray = new Array("-moz-image-region: rect(0px 32px 16px 16px);",
								"-moz-image-region: rect(0px 48px 16px 32px);",
								"-moz-image-region: rect(0px 64px 16px 48px);",
								"-moz-image-region: rect(0px 80px 16px 64px);",
								"-moz-image-region: rect(0px 96px 16px 80px);",
								"-moz-image-region: rect(0px 112px 16px 96px);");

var GBL_HighlightColors = new Array("background: #FF0;", "background: #0FF;", "background: #0F0;",
									"background: #F0F;", "background: orange;", "background: dodgerblue;");

/***************************************
DEBUG FUNCTIONS
****************************************/

function GBL_Log(aMessage)
{
	GBL_ConsoleService.logStringMessage('Googlebar_Lite: ' + aMessage);
}

/***************************************
END DEBUG FUNCTIONS
****************************************/

var GBL_Listener =
{
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
				GBL_AddHighlighting(null);
		}
	},

	onLocationChange: function(aProgress, aRequest, aLocation)
	{
		if (aLocation)
		{
			var terms = "";
			var url = GBL_ConvertToURL(aLocation.spec);

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
				var urlQuery = GBL_ExtractQuery(aLocation.spec);
				var queryParts = GBL_ParseQueryString(urlQuery);
				for(var q in queryParts)
				{
					if(q == "q" || q == "as_q")
					{
						terms = queryParts[q];
						var searchTerms = GBL_GetSearchTerms();
						if(searchTerms != terms)
						{
							GBL_SetSearchTerms(terms);
							GBL_TermsHaveUpdated();
						}
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

			GBL_UpdateUpMenu();
		}
	}
};

var GBL_SearchObserver =
{
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
		GBL_DragDropToSearchBox(dropData.data);
	}
};

function GBL_About()
{
    window.openDialog("chrome://googlebarlite/content/about.xul", "About Googlebar Lite", "centerscreen,chrome,modal");
}

function GBL_AddHighlighting(win)
{
	if(!win)
		win = window.content;

	var i=0; // Avoid multiple redeclaration warnings

	for(i=0; win.frames && i < win.frames.length; i++)
	{
		GBL_AddHighlighting(win.frames[i]);
	}

	var doc = win.document;
	if(!doc) { return; }

	var body = doc.body;
	if(!body) { return; }

	var terms = GBL_TrimString(GBL_GetSearchTerms());
	var termsArray = GBL_SplitTerms(terms);
	GBL_LastHighlightedTerms = terms; // Back up the highlighted terms

	var count = body.childNodes.length;

	for(i=0; i<termsArray.length; i++)
	{
		var term = termsArray[i];
		
		var span = doc.createElement("span");
		span.setAttribute("style", GBL_HighlightColors[i%6] + " color: #000; display: inline !important; font-size: inherit !important;");
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
		while( (result = GBL_Finder.Find(term, searchRange, start, end)) )
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
}

function GBL_AddSearchWordButton(term)
{
	var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
	var highlighter = document.getElementById("GBL-TB-Highlighter");
	var overflowButton = document.getElementById("GBL-Overflow-Button");
	var overflowMenu = document.getElementById("GBL-Overflow-Menu");
	var stringBundle = document.getElementById("GBL-String-Bundle");

	var searchTerms = GBL_SplitTerms(term);
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
		{
			continue; // Ignore this term
		}

		// Escape all apostrophes to prevent XSS problems
		var safeTerm = thisTerm.replace(/'/g, "\\'");
		safeTerm = "\'" + safeTerm + "\'";

		tempButton = document.createElement("toolbarbutton");
		tempButton.setAttribute("label",  thisTerm);
		tempButton.setAttribute("collapsed", "false");
		tempButton.setAttribute("tooltiptext", stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm]));
		tempButton.setAttribute("oncommand", "GBL_FindInPage(" + safeTerm + ", event)");
		tempButton.className = "GBL-TB-SearchWordButton";

		searchWordsContainer.appendChild(tempButton);

		tempMenuItem = document.createElement("menuitem");
		tempMenuItem.setAttribute("label",  thisTerm);
		tempMenuItem.setAttribute("collapsed", "true");
		tempMenuItem.setAttribute("tooltiptext", stringBundle.getFormattedString("GBL_FindNextOccurrence", [thisTerm]));
		tempMenuItem.setAttribute("oncommand", "GBL_FindInPage(" + safeTerm + ", event)");

		if(highlighter.checked == true)
		{
			tempButton.setAttribute("style", GBL_StylesArray[i%6] + " !important");
			tempMenuItem.setAttribute("style", GBL_StylesArray[i%6] + " !important");
		}

		overflowMenu.appendChild(tempMenuItem);
	}

	GBL_Resize(null); // Fake a resize to overflow properly
}

function GBL_BuildFunction(obj, method)
{
	return function()
	{
		return method.apply(obj, arguments);
	}
}

function GBL_BuildSearchURL(prefix, restrict, searchTerms)
{
	var u = "";
	if(GBL_SiteToUse.length > 0)
		u = "http://" + prefix + GBL_SiteToUse.substr(3) + "/" + restrict;
	else
		u = "http://" + prefix + ".google.com/" + restrict;

	if(searchTerms.length > 0)
		u += "?q=" + searchTerms + "&ie=UTF-8";

	return u;
}

function GBL_CheckButtonContainer()
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
}

function GBL_CheckHighlighting()
{
	//var searchTerms = document.getElementById("GBL-SearchTerms").value;
	var hbutton = document.getElementById("GBL-TB-Highlighter");
	
	var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
	if(searchWordsContainer.childNodes.length > 0)
		hbutton.setAttribute("disabled", false);
	else
		hbutton.setAttribute("disabled", true);
}

function GBL_ClearHistory(flag)
{
	if(flag == "false")
		return;

	GBL_History.removeEntriesForName("GBL-Search-History");

	GBL_SetSearchTerms("");			// Clear the search terms box
	GBL_ClearSearchWordButtons();	// Clear the search word buttons

	var hb = document.getElementById("GBL-TB-Highlighter");

	if(hb.checked == true)
	{
		hb.checked = false;
		GBL_RemoveHighlighting(null);
	}
}

function GBL_ClearHistoryPrompt()
{
	if(GBL_PromptToClear)
		window.openDialog("chrome://googlebarlite/content/confirm.xul", "Clear Search History?", "centerscreen,chrome,modal");
	else
		GBL_ClearHistory(true);
}

function GBL_ClearSearchWordButtons()
{
	var i=0;

	var searchWordsContainer = document.getElementById("GBL-TB-SearchWordsContainer");
	for(i=searchWordsContainer.childNodes.length; i > 0; i--)
		searchWordsContainer.removeChild(searchWordsContainer.childNodes[0]);

	var overflowMenu = document.getElementById("GBL-Overflow-Menu");
	for(i=overflowMenu.childNodes.length; i > 0; i--)
		overflowMenu.removeChild(overflowMenu.childNodes[0]);
}

function GBL_CombinedSearch(event)
{
	if(GBL_RememberCombined == true)
	{
		var TB_Combined = document.getElementById("GBL-TB-Combined");
		var type = TB_Combined.getAttribute("searchType");

		GBL_PrepareSearch(event, type);
	}
	else
		GBL_PrepareSearch(event, 'web');
}

function GBL_ConfigureKeyboardShortcuts()
{
	var windowEnumeration = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser");

	// Loop through all open windows
	while(windowEnumeration.hasMoreElements())
	{
		var mainDocument = windowEnumeration.getNext().document;
		if(mainDocument)
		{
			var focusKey = mainDocument.getElementById("GBL-Focus-Key");
			focusKey.setAttribute("key", GBL_FocusKey);
		}
	}
}

function GBL_ConvertTermsToURI(terms)
{
	var termArray = new Array();
	termArray = terms.split(" ");
	var result = "";

	for(var i=0; i<termArray.length; i++)
	{
		if(i > 0) { result += "+"; }
		result += GBL_MakeSafe(termArray[i]);
	}

	return result;
}

function GBL_ConvertToURL(url)
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
}

function GBL_DelayedStartup()
{
	var navtoolbox = document.getElementById("navigator-toolbox");
	GBL_OriginalCustomizeDone = navtoolbox.customizeDone;
	navtoolbox.customizeDone = GBL_BuildFunction(this, GBL_ToolboxCustomizeDone);

	var searchbox = document.getElementById("GBL-SearchBox");
	searchbox.addEventListener("popupshowing", GBL_SearchContextOnPopupShowing, true);
	searchbox.addEventListener("dragdrop", GBL_SearchBoxOnDrop, true); // Pre-FF 3.5
	searchbox.addEventListener("drop", GBL_SearchBoxOnDrop, true); // FF 3.5+
}

function GBL_DisableSearchHistory(neverShowAgain)
{
	// Disable the Googlebar Lite search history option and make sure we update the search box
	GBL_Branch.setBoolPref(GBL_PrefName_MaintainHistory, false);
	GBL_UpdateSearchBoxSettings();

	// Disable the dialog from being displayed if the user asked to do so
	if(neverShowAgain)
		GBL_Branch.setBoolPref(GBL_PrefName_WarnOnFormHistory, false);
}

function GBL_DragDropToSearchBox(data)
{
	var d = window.content.document;
	var tempDiv = d.createElement("div");
	tempDiv.innerHTML = data;

	var searchTerms = GBL_GetTextContent(tempDiv);
	searchTerms = searchTerms.replace(/[\r\n]/g, '');
	searchTerms = GBL_TrimString(searchTerms);

	GBL_SetSearchTerms(searchTerms);
	GBL_TermsHaveUpdated();

	if(GBL_SearchOnDragDrop)
		GBL_Search(searchTerms, "web", false, false);
}

function GBL_EnableFormHistory(neverShowAgain)
{
	var b = GBL_PrefService.getBranch("browser.");

	// Enable form history
	b.setBoolPref("formfill.enable", true);

	// Disable the dialog from being displayed if the user asked to do so
	if(neverShowAgain)
		GBL_Branch.setBoolPref(GBL_PrefName_WarnOnFormHistory, false);
}

function GBL_ExtractQuery(url)
{
	if (/^[^?]+?\?(.*)/.test(url))
	{
		return RegExp.$1;
	}
	else if(/^[^#]+?#([^#]+)/.test(url)) // Test for an AJAX-style query if we didn't see the normal one
	{
		return RegExp.$1;
	}
	else
		return "";
}

function GBL_FindInPage(term, e)
{
	/* This is shamelessly taken from Firebird findUtils.js */
	var found = false;
	var focusedWindow = window.document.commandDispatcher.focusedWindow;
	if (!focusedWindow || focusedWindow == window)
		focusedWindow = window.content;
	var findInst = getBrowser().webBrowserFind;
	var findInFrames = findInst.QueryInterface(Components.interfaces.nsIWebBrowserFindInFrames);
	findInFrames.rootSearchFrame = window.content;
	findInFrames.currentSearchFrame = focusedWindow;
	
	// setup the find instance
	findInst.searchString = term;
    findInst.searchFrames = true;
	findInst.wrapFind = true;
	
	if(e)
	{
		findInst.entireWord		= e.altKey;
		findInst.findBackwards	= e.shiftKey;
		findInst.matchCase		= e.ctrlKey;

		if(findInst.entireWord)
			findInst.searchString  = ' ' + str + ' ';
	}

	found = findInst.findNext();
	
	var stringBundle = document.getElementById("GBL-String-Bundle");
	var thisTerm = "\'" + term + "\'";

	if (!found)
	{
		GBL_Sound.beep();
		window.content.status = stringBundle.getFormattedString("GBL_TermNotFound", [thisTerm]);
	}
}

function GBL_FixOldPrefs()
{
	var temp = "";

	var oldName = "buttons.dictionary";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		temp = GBL_Branch.getBoolPref(oldName);
		GBL_Branch.setBoolPref(GBL_PrefName_TB_Answers, temp);
		GBL_TB_ShowAnswers = temp;

		try {
			GBL_Branch.clearUserPref(oldName);
		} catch (e) {}
	}

	oldName = "ignore_definitions";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		temp = GBL_Branch.getBoolPref(oldName);
		GBL_Branch.setBoolPref(GBL_PrefName_IgnoreAnswers, temp);
		GBL_IgnoreAnswers = temp;

		try {
			GBL_Branch.clearUserPref(oldName);
		} catch (e) {}
	}

	oldName = "context.define";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		temp = GBL_Branch.getBoolPref(oldName);
		GBL_Branch.setBoolPref(GBL_PrefName_CM_Answers, temp);
		GBL_CM_Answers = temp;

		try {
			GBL_Branch.clearUsedPref(oldName);
		} catch (e) {}
	}

	oldName = "search_history";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		var history = GBL_Branch.getComplexValue(oldName, Components.interfaces.nsISupportsString).data;
		var historyArray = new Array();
		historyArray = history.split("||");

		for(var i=0; i<historyArray.length; i++)
		{
			if(historyArray[i] != "")
				GBL_History.addEntry("GBL-Search-History", historyArray[i]);
		}

		try {
			GBL_Branch.clearUserPref(oldName);
		} catch(e) {}
	}

	oldName = "max_history_size";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		try {
			GBL_Branch.clearUserPref(oldName);
		} catch(e) {}
	}

	oldName = "preserve_history";
	if(GBL_Branch.prefHasUserValue(oldName))
	{
		try {
			GBL_Branch.clearUserPref(oldName);
		} catch(e) {}
	}

	// Since we have already loaded preferences, let's check for invalid values
	if(GBL_ShiftSearch == "dictionary" || GBL_ShiftSearch == "thesaurus")
		GBL_ShiftSearch = "answers";

	if(GBL_CtrlSearch == "dictionary" || GBL_CtrlSearch == "thesaurus")
		GBL_CtrlSearch = "answers";

	if(GBL_ShiftCtrlSearch == "dictionary" || GBL_ShiftCtrlSearch == "thesaurus")
		GBL_ShiftCtrlSearch = "answers";
}

function GBL_GetSearchTerms()
{
	return document.getElementById("GBL-SearchBox").value;
}

function GBL_GetSearchType(event)
{
	// Return the default value if the event is null
	if(!event)
		return "web";
	
	if(event.shiftKey)
	{
		if(event.ctrlKey)
			return GBL_ShiftCtrlSearch;
		else
			return GBL_ShiftSearch;
	}

	if(event.ctrlKey)
		return GBL_CtrlSearch;

	// Are we remembering the combined search type? If so, return that value
	if(GBL_RememberCombined == true)
	{
		return document.getElementById("GBL-TB-Combined").getAttribute("searchType");
	}

	return "web"; // Return the default if no search type modifiers were caught.
}

function GBL_GetTextContent(node)
{
	if(node.nodeType == Node.TEXT_NODE)
		return node.nodeValue;
	else
	{
		var str = "";
		for(var i=0; i < node.childNodes.length; i++)
		{
			if(node.childNodes[i].nodeName != "SCRIPT")
				str += GBL_GetTextContent(node.childNodes[i]);
		}
		return str;
	}
}

function GBL_Help()
{
	var newTab = getBrowser().addTab("http://www.borngeek.com/firefox/googlebarlite/doc/");
	getBrowser().selectedTab = newTab;
}

function GBL_Init()
{
	var mainItem = document.getElementById("GBL-Toolbar-MainItem");

	// Only initialize if the main toolbar item is present
	if(mainItem && GBL_OneTime == false)
	{
		GBL_OneTime = true;

		window.getBrowser().addProgressListener(GBL_Listener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);

		setTimeout(GBL_DelayedStartup, 10); // Needs to happen after Firefox's delayedStartup()

		// Load the preferences that are stored
		GBL_LoadPrefs();

		GBL_FixOldPrefs();			// Clean up deprecated preferences
		GBL_ConfigureKeyboardShortcuts();
		GBL_UpdateButtons();
		GBL_UpdateContextMenuVisibility();
		GBL_UpdateSearchBoxSettings();
		GBL_UpdateUpMenu();

		if(window.opener != null)
		{
			var osb = window.opener.document.getElementById("GBL-SearchBox");
			document.getElementById("GBL-SearchBox").value = osb.value;
			GBL_TermsHaveUpdated();
		}

		setTimeout("GBL_ValidateSearchHistorySetting()", 10);
	}
}

function GBL_LoadPrefs()
{
	var b = GBL_Branch;

	// General Preferences
	GBL_SiteToUse			= b.getComplexValue(GBL_PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString).data;
	GBL_ClickSelectsAll		= b.getBoolPref(GBL_PrefName_ClickSelectsAll);
	GBL_SearchInTab			= b.getBoolPref(GBL_PrefName_SearchInTab);
	GBL_RememberCombined	= b.getBoolPref(GBL_PrefName_RememberCombined);
	GBL_SearchOnDragDrop	= b.getBoolPref(GBL_PrefName_SearchOnDragDrop);
	GBL_WarnOnFormHistory	= b.getBoolPref(GBL_PrefName_WarnOnFormHistory);
	GBL_MaintainHistory		= b.getBoolPref(GBL_PrefName_MaintainHistory);
	GBL_EnableAutoComplete	= b.getBoolPref(GBL_PrefName_EnableAutoComplete);
	GBL_UseInlineComplete	= b.getBoolPref(GBL_PrefName_UseInlineComplete);
	GBL_AutoSearch 			= b.getBoolPref(GBL_PrefName_AutoSearch);
	GBL_PromptToClear 		= b.getBoolPref(GBL_PrefName_PromptToClear);
	GBL_IgnoreAnswers 		= b.getBoolPref(GBL_PrefName_IgnoreAnswers);

	// Advanced / Hidden preferences
	if(GBL_Branch.prefHasUserValue(GBL_PrefName_Sandbox))
		GBL_Sandbox = b.getBoolPref(GBL_PrefName_Sandbox);

	// Toolbar button preferences
	GBL_TB_ShowLabels 		= b.getBoolPref(GBL_PrefName_TB_ShowLabels);
	GBL_TB_ShowUp 			= b.getBoolPref(GBL_PrefName_TB_Up);
	GBL_TB_ShowHighlighter 	= b.getBoolPref(GBL_PrefName_TB_Highlighter);
	GBL_TB_ShowSearchWords 	= b.getBoolPref(GBL_PrefName_TB_SearchWords);
	GBL_TB_ShowCombined 	= b.getBoolPref(GBL_PrefName_TB_Combined);
	GBL_TB_ShowWeb 			= b.getBoolPref(GBL_PrefName_TB_Web);
	GBL_TB_ShowLucky 		= b.getBoolPref(GBL_PrefName_TB_Lucky);
	GBL_TB_ShowSite 		= b.getBoolPref(GBL_PrefName_TB_Site);
	GBL_TB_ShowImages 		= b.getBoolPref(GBL_PrefName_TB_Images);
	GBL_TB_ShowVideo 		= b.getBoolPref(GBL_PrefName_TB_Video);
	GBL_TB_ShowNews 		= b.getBoolPref(GBL_PrefName_TB_News);
	GBL_TB_ShowMaps 		= b.getBoolPref(GBL_PrefName_TB_Maps);
	GBL_TB_ShowShopping		= b.getBoolPref(GBL_PrefName_TB_Shopping);
	GBL_TB_ShowGroups 		= b.getBoolPref(GBL_PrefName_TB_Groups);
	GBL_TB_ShowBlog 		= b.getBoolPref(GBL_PrefName_TB_Blog);
	GBL_TB_ShowBook 		= b.getBoolPref(GBL_PrefName_TB_Book);
	GBL_TB_ShowFinance		= b.getBoolPref(GBL_PrefName_TB_Finance);
	GBL_TB_ShowScholar		= b.getBoolPref(GBL_PrefName_TB_Scholar);
	GBL_TB_ShowAnswers 		= b.getBoolPref(GBL_PrefName_TB_Answers);

	// Search modifiers preferences
	GBL_FocusKey			= b.getCharPref(GBL_PrefName_FocusKey);
	GBL_ShiftSearch 		= b.getCharPref(GBL_PrefName_ShiftSearch);
	GBL_CtrlSearch 			= b.getCharPref(GBL_PrefName_CtrlSearch);
	GBL_ShiftCtrlSearch 	= b.getCharPref(GBL_PrefName_ShiftCtrlSearch);

	// Context menu preferences
	GBL_CM_ShowContext 		= b.getBoolPref(GBL_PrefName_CM_ShowContext);
	GBL_CM_Web 				= b.getBoolPref(GBL_PrefName_CM_Web);
	GBL_CM_Site				= b.getBoolPref(GBL_PrefName_CM_Site);
	GBL_CM_Images 			= b.getBoolPref(GBL_PrefName_CM_Images);
	GBL_CM_Video			= b.getBoolPref(GBL_PrefName_CM_Video);
	GBL_CM_Groups 			= b.getBoolPref(GBL_PrefName_CM_Groups);
	GBL_CM_Maps 			= b.getBoolPref(GBL_PrefName_CM_Maps);
	GBL_CM_Answers 			= b.getBoolPref(GBL_PrefName_CM_Answers);
	GBL_CM_Backward 		= b.getBoolPref(GBL_PrefName_CM_Backward);
	GBL_CM_Cached 			= b.getBoolPref(GBL_PrefName_CM_Cached);
	GBL_CM_CachedLink 		= b.getBoolPref(GBL_PrefName_CM_CachedLink);
	GBL_CM_Similar 			= b.getBoolPref(GBL_PrefName_CM_Similar);
	GBL_CM_Translate 		= b.getBoolPref(GBL_PrefName_CM_Translate);
}

function GBL_LoadURL(url, openTab)
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
}

function GBL_MakeSafe(term)
{
	var safeTerm = encodeURIComponent(term);
	safeTerm = safeTerm.replace(/\'/g, '%27');
	return safeTerm;
}

function GBL_OpenInTab(aEvent, allowAltKey)
{
	if(aEvent == null)
		aEvent = { ctrlKey:false, altKey:false, button:0 };

	// If the search in tab option is checked, and we aren't viewing a blank window, open a new tab regardless
	if(window.content.document.location != "about:blank" && GBL_SearchInTab)
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
}

function GBL_OpenOptions()
{
	window.openDialog("chrome://googlebarlite/content/options.xul", "Googlebar Lite Options", "centerscreen,chrome,modal");
}

function GBL_OptionsHaveUpdated()
{
	GBL_LoadPrefs(); // Update our globals based on what got stored

	// Remove any highlighting that might be present (but only if the button is being hidden)
	var hb = document.getElementById("GBL-TB-Highlighter");
	if(hb.checked == true && GBL_TB_ShowHighlighter == false)
	{
		hb.checked = false;
		GBL_RemoveHighlighting(null);
		GBL_LastHighlightedTerms = ""; // Reset the backed up terms, just to be clean about it
		GBL_UpdateSearchWordButtons();
	}

	GBL_UpdateButtons();
	GBL_UpdateContextMenuVisibility();
	GBL_UpdateSearchBoxSettings();
	GBL_CheckButtonContainer();
	GBL_Resize(null); // Fake a resize to overflow properly

	GBL_ValidateSearchHistorySetting();
}

function GBL_ParseQueryString(query)
{
	var pieces = {};
	if(query)
	{
		// Strip any anchors (so they don't show up as search terms)
		//query = query.replace(/#.*$/, "");
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
}

function GBL_PasteAndSearch()
{
	GBL_Clipboard.getData(GBL_Transferable, GBL_Clipboard.kGlobalClipboard);
	
	var str = new Object();
	var strLength = new Object();
	
	GBL_Transferable.getTransferData("text/unicode", str, strLength);

	if(!str) return; // Exit if nothing there

	str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
	var pastetext = str.data.substring(0, strLength.value / 2);
	pastetext = GBL_TrimString(pastetext);

	if(pastetext.length == 0) return; // Exit if text is empty

	GBL_SetSearchTerms(pastetext);

	GBL_TermsHaveUpdated();

	var useTab = false;
	if(window.content.document.location != "about:blank")
		useTab = GBL_SearchInTab;

	GBL_Search(pastetext, 'web', false, useTab);
}

function GBL_PrepareMainMenu(event, searchType)
{
	var useTab = GBL_OpenInTab(event, false);
	
	if(searchType == "gmail")
	{
		GBL_LoadURL("https://gmail.google.com/", useTab);
		return;
	}

	GBL_Search('', searchType, true, useTab);
}

function GBL_PrepareSearch(event, searchType)
{
	// Step 1: Determine if we need to open search results in a new tab
	var useTab = GBL_OpenInTab(event, false);
	
	// Step 2: Check the search type (if necessary)
	if(searchType == "")
		searchType = GBL_GetSearchType(event);

	// Step 3: Get the search terms
	var searchTerms = GBL_TrimString(GBL_GetSearchTerms());
	var isEmpty = false;

	if(searchTerms.length == 0)
		isEmpty = true;

	// Step 4: Perform the search
	GBL_Search(searchTerms, searchType, isEmpty, useTab);
}

function GBL_PrepareCachedSearch(searchType)
{
	var useTab = false;

	// Is the "always use tab" option checked? If so, set the useTab flag to true.
	if(window.content.document.location != "about:blank")
        useTab = GBL_SearchInTab;
	
	GBL_Search('', searchType, true, useTab);
}

function GBL_PrepareSelectedSearch(aEvent, searchType)
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

	selection = GBL_TrimString(selection); // Clean up whitespace
	
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

	GBL_SetSearchTerms(selection);
	GBL_TermsHaveUpdated();

	// ****************************************
	// Step 4: Perform the search
	// ****************************************

	var useTab = GBL_OpenInTab(aEvent, false);

	GBL_Search(selection, searchType, false, useTab);
}

function GBL_RemoveHighlighting(win)
{
	// Remove highlighting.  We use the find API again rather than
	// searching for our span elements by id so that we gain access to the
	// anonymous content that nsIFind searches.

	if(!win)
        win = window.content;

	var i=0; // Avoid multiple redeclaration warnings

	for(i=0; win.frames && i < win.frames.length; i++)
	{
		GBL_RemoveHighlighting(win.frames[i]);
	}

	var doc = win.document;
	if(!doc) { return; }
	var body = doc.body;
	if(!body) { return; }

	var count = body.childNodes.length;
	var terms = GBL_LastHighlightedTerms; // Restore the previously backed up highlighted terms
	var termsArray = GBL_SplitTerms(terms);

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
		while((retRange = GBL_Finder.Find(term, searchRange, startPt, endPt)))
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
}

function GBL_RemoveListener()
{
	window.getBrowser().removeProgressListener(GBL_Listener);
}

function GBL_Resize(event)
{
	// Sizing issue hack (taken from patch for bug 266737)
	if(event && event.type == 'focus') 
		window.removeEventListener('focus', GBL_Resize, false);
	
	var buttons = document.getElementById("GBL-TB-SearchWordsContainer");
	if(!buttons || !GBL_TB_ShowSearchWords)
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
        window.addEventListener('focus', GBL_Resize, false);

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
}

function GBL_Search(searchTerms, searchType, isEmpty, useTab)
{
    var win = window.content.document;
    var URL = "";
	var originalTerms = searchTerms;
	var canIgnore = false;	// True if doing an Answers.com search

	// ****************************************
	// Step 1: Convert the search terms into a URI capable string
	// ****************************************
	if(isEmpty == false)
		searchTerms = GBL_ConvertTermsToURI(searchTerms);

	// ****************************************
	// Step 2: Switch on the search type
	// ****************************************

	switch(searchType)
	{
	case "web":
		if(isEmpty) { URL = GBL_BuildSearchURL((GBL_Sandbox ? "www2.sandbox" : "www"), "", ""); }
		else		{ URL = GBL_BuildSearchURL((GBL_Sandbox ? "www2.sandbox" : "www"), "search", searchTerms); }
		break;

	case "lucky":
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "search", searchTerms + "&btnI=I%27m+Feeling+Lucky"); }
		break;

	case "site":
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "search", "site:" + win.location.hostname + "+" + searchTerms); }
		break;

	case "images":
		if(isEmpty) { URL = GBL_BuildSearchURL("images", "", ""); }
		else		{ URL = GBL_BuildSearchURL("images", "images", searchTerms); }
		break;

	case "video":
		if(isEmpty) { URL = GBL_BuildSearchURL("video", "", ""); }
		else		{ URL = GBL_BuildSearchURL("video", "videosearch", searchTerms); }
		break;

	case "news":
		if(isEmpty) { URL = GBL_BuildSearchURL("news", "", ""); }
		else		{ URL = GBL_BuildSearchURL("news", "news", searchTerms); }
		break;

	case "maps":
		if(isEmpty) { URL = GBL_BuildSearchURL("maps", "", ""); }
		else		{ URL = GBL_BuildSearchURL("maps", "maps", searchTerms); }
		break;

	case "shopping":
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "products", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "products", searchTerms); }
		break;

	case "groups":
		if(isEmpty) { URL = GBL_BuildSearchURL("groups", "", ""); }
		else		{ URL = GBL_BuildSearchURL("groups", "groups", searchTerms); }
		break;

	case "blog":
		if(isEmpty) { URL = GBL_BuildSearchURL("blogsearch", "blogsearch", ""); }
		else		{ URL = GBL_BuildSearchURL("blogsearch", "blogsearch", searchTerms); }
		break;

	case "book":
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "books", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "books", searchTerms); }
		break;

	case "finance":
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "finance", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "finance", searchTerms); }
		break;

	case "scholar":
		if(isEmpty) { URL = GBL_BuildSearchURL("scholar", "", ""); }
		else		{ URL = GBL_BuildSearchURL("scholar", "scholar", searchTerms); }
		break;

	case "answers":
		canIgnore = true;
		if(isEmpty) { URL = "http://www.answers.com/"; }
		else		{ URL = "http://www.answers.com/" + searchTerms + "?gwp=13"; }
		break;

	// The following cases are only accessible through the context menu
	case "backwards":
		URL = GBL_BuildSearchURL("www", "search", "link:" + win.location.href);
		break;

	case "cached":
		URL = GBL_BuildSearchURL("www", "search", "cache:" + win.location.href);
		break;

	case "cachedlink":
		URL = GBL_BuildSearchURL("www", "search", "cache:" + gContextMenu.link);
		break;

	case "similar":
		URL = GBL_BuildSearchURL("www", "search", "related:" + win.location.href);
		break;

	case "translate":
		// Only uses .com (no country customization)
		URL = "http://translate.google.com/translate?u=" + win.location.href;
		break;

	// The following cases are only accessible through items on the GBL main menu
	case "advanced":
		URL = GBL_BuildSearchURL("www", "advanced_search", "");
		break;

	case "searchprefs":
		URL = GBL_BuildSearchURL("www", "preferences", "");
		break;

	case "languagetools":
		URL = GBL_BuildSearchURL("www", "language_tools", "");
		break;

	default:
		if(isEmpty) { URL = GBL_BuildSearchURL("www", "", ""); }
		else		{ URL = GBL_BuildSearchURL("www", "search", searchTerms); }
		break;
	}

	// ****************************************
	// Step 3: Add terms to search history
	// ****************************************

	if(GBL_MaintainHistory && !isEmpty && !(canIgnore && GBL_IgnoreAnswers))
		GBL_History.addEntry("GBL-Search-History", originalTerms);

	// ****************************************
	// Step 4: Perform search
	// ****************************************

	GBL_LoadURL(URL, useTab);
}

function GBL_SearchBoxClickHandler(aEvent, aElt)
{
	if(!GBL_IgnoreClick && GBL_ClickSelectsAll && aElt.selectionStart == aElt.selectionEnd)
		aElt.select();
}

function GBL_SearchBoxFocusHandler(aEvent, aElt)
{
	if(GBL_IgnoreFocus)
		GBL_IgnoreFocus = false;
	else if(GBL_ClickSelectsAll)
		aElt.select();
}

function GBL_SearchBoxMouseDownHandler(aEvent, aElt)
{
	if(aElt.hasAttribute("focused"))
		GBL_IgnoreClick = true;
	else
	{
		GBL_IgnoreFocus = true;
		GBL_IgnoreClick = false;
		aElt.setSelectionRange(0, 0);
	}
}

function GBL_SearchBoxOnDrop(event)
{
	nsDragAndDrop.drop(event, GBL_SearchObserver);
}

function GBL_SearchBoxTextEntered(aTriggeringEvent)
{
	// Step 1: Get the search terms
	var terms = GBL_TrimString(GBL_GetSearchTerms());
	var isEmpty = (terms.length == 0);

	// Step 2: Do we need to open a new tab?
	var useTab = GBL_OpenInTab(aTriggeringEvent, true);

	// Step 3: Get the search type
	var searchType = GBL_GetSearchType(aTriggeringEvent);

	// Step 4: Search
	if(aTriggeringEvent != null || (aTriggeringEvent == null && GBL_AutoSearch))
		GBL_Search(terms, searchType, isEmpty, useTab);
}

function GBL_SearchContextOnPopupShowing(e)
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
}

function GBL_SetFocus(event)
{
	var toolbar = document.getElementById("GBL-Toolbar");
	if(toolbar != null)
	{
		var searchBox = document.getElementById("GBL-SearchBox");
		if(searchBox != null && (!searchBox.parentNode || searchBox.parentNode.parentNode != toolbar || ! toolbar.collapsed))
			searchBox.focus();
	}
}

function GBL_SetSearchTerms(terms)
{
	var searchbox = document.getElementById("GBL-SearchBox");
	searchbox.value = terms;
}

function GBL_SplitTerms(searchwords)
{
	var string = GBL_TrimString(searchwords);
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
}

function GBL_TermsHaveUpdated()
{
	GBL_UpdateSearchWordButtons();
	GBL_CheckHighlighting();
}

function GBL_ToggleHighlighting()
{
	var hb = document.getElementById("GBL-TB-Highlighter");

	if(hb.checked == true)
	{
		hb.checked = false;
		GBL_RemoveHighlighting(null);
		GBL_LastHighlightedTerms = ""; // Reset the backed up terms, just to be clean about it
	}
	else
	{
		hb.checked = true;
		GBL_AddHighlighting(null);
	}

	GBL_UpdateSearchWordButtons();
}

function GBL_ToggleToolbar()
{
    var toolbar = document.getElementById("GBL-Toolbar");
    toolbar.collapsed = !toolbar.collapsed;
    document.persist("GBL-Toolbar", "collapsed");
}

function GBL_ToolboxCustomizeDone(somethingChanged)
{
	var mainItem = document.getElementById("GBL-Toolbar-MainItem");

	// Don't process anything if mainItem is null (the toolbar item has been dragged into the toolbox)
	if(mainItem && somethingChanged)
	{
		// We have to do all kinds of initialization in this case,
		// since we don't know the state from which the user is coming

		// Do "first time" initialization if necessary
		if(GBL_OneTime == false)
		{
			GBL_OneTime = true;
			window.getBrowser().addProgressListener(GBL_Listener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
			setTimeout(GBL_DelayedStartup, 1); // Needs to happen after Firefox's delayedStartup()
		}

		// Do some generic initialization
		GBL_OptionsHaveUpdated();
		GBL_UpdateUpMenu();
		
		// Clear the search words (and buttons) every time (to avoid a weird auto-selection bug with search history)
		GBL_SetSearchTerms("");
		GBL_ClearSearchWordButtons();
		GBL_TermsHaveUpdated();
	}

	this.GBL_OriginalCustomizeDone(somethingChanged);
}

function GBL_TrimString(string)
{
    if (!string) return "";

	// Efficiently replace leading and trailing white space
	string = string.replace(/^\s+/, '');
	string = string.replace(/\s+$/, '');

	// Replace all whitespace runs with a single space
	string = string.replace(/\s+/g, ' ');

	return string;
}

function GBL_Up(event, path)
{
	var useTab = GBL_OpenInTab(event, false);

	// Path is empty if the user clicks the up button
	if(path == "")
	{
		var upMenu = document.getElementById("GBL-TB-UpMenu");

		if(upMenu && upMenu.childNodes.length > 0)
			GBL_LoadURL(upMenu.childNodes.item(0).getAttribute("label"), useTab);
	}
	else
		GBL_LoadURL(path, useTab);
}

function GBL_UpdateButtons()
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
	TB_Combined.setAttribute("collapsed", !GBL_TB_ShowCombined);
	TB_Web.setAttribute("collapsed", !GBL_TB_ShowWeb);
	TB_Lucky.setAttribute("collapsed", !GBL_TB_ShowLucky);
	TB_Site.setAttribute("collapsed", !GBL_TB_ShowSite);
	TB_Images.setAttribute("collapsed", !GBL_TB_ShowImages);
	TB_Video.setAttribute("collapsed", !GBL_TB_ShowVideo);
	TB_News.setAttribute("collapsed", !GBL_TB_ShowNews);
	TB_Maps.setAttribute("collapsed", !GBL_TB_ShowMaps);
	TB_Shopping.setAttribute("collapsed", !GBL_TB_ShowShopping);
	TB_Groups.setAttribute("collapsed", !GBL_TB_ShowGroups);
	TB_Blog.setAttribute("collapsed", !GBL_TB_ShowBlog);
	TB_Book.setAttribute("collapsed", !GBL_TB_ShowBook);
	TB_Finance.setAttribute("collapsed", !GBL_TB_ShowFinance);
	TB_Scholar.setAttribute("collapsed", !GBL_TB_ShowScholar);
	TB_Answers.setAttribute("collapsed", !GBL_TB_ShowAnswers);
	
	TB_Up.setAttribute("collapsed", !GBL_TB_ShowUp);
	TB_Highlighter.setAttribute("collapsed", !GBL_TB_ShowHighlighter);
	TB_SWContainer.setAttribute("collapsed", !GBL_TB_ShowSearchWords);

	// Update the separators on the toolbar
	// Set hidden (not collapsed) on the separators since collapsed elements don't have their margins collapsed (bug #90616)
	TB_Sep1.setAttribute("hidden", !GBL_TB_ShowCombined);
	TB_Sep2.setAttribute("hidden", !(GBL_TB_ShowWeb || GBL_TB_ShowLucky || GBL_TB_ShowSite || GBL_TB_ShowImages || GBL_TB_ShowVideo ||
									 GBL_TB_ShowNews || GBL_TB_ShowMaps || GBL_TB_ShowGroups || GBL_TB_ShowBlog || GBL_TB_ShowBook ||
									 GBL_TB_ShowScholar || GBL_TB_ShowAnswers || GBL_TB_ShowFinance || GBL_TB_ShowShopping)); 

	TB_Sep3.setAttribute("hidden", !(GBL_TB_ShowUp || GBL_TB_ShowHighlighter));
	
	// Reset the button icon if the remember combined search type option is turned off
	if(GBL_RememberCombined == false)
		TB_Combined.setAttribute("searchType", "web");

	// Set button labels as necessary
	if(GBL_TB_ShowLabels == true)
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
}

function GBL_UpdateCombinedSearch(event, type)
{
	if(GBL_RememberCombined == true)
	{
		var TB_Combined = document.getElementById("GBL-TB-Combined");
		TB_Combined.setAttribute("searchType", type);
	}

	GBL_PrepareSearch(event, type);
}

function GBL_UpdateContextMenu()
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
	conWeb.setAttribute("collapsed", !GBL_CM_Web);
	conSite.setAttribute("collapsed", !GBL_CM_Site);
	conImages.setAttribute("collapsed", !GBL_CM_Images);
	conVideo.setAttribute("collapsed", !GBL_CM_Video);
	conGroups.setAttribute("collapsed", !GBL_CM_Groups);
	conMaps.setAttribute("collapsed", !GBL_CM_Maps);
	conAnswers.setAttribute("collapsed", !GBL_CM_Answers);
	conBackward.setAttribute("collapsed", !GBL_CM_Backward);
	conCached.setAttribute("collapsed", !GBL_CM_Cached);
	conCachedLink.setAttribute("collapsed", !GBL_CM_CachedLink);
	conSimilar.setAttribute("collapsed", !GBL_CM_Similar);
	conTranslate.setAttribute("collapsed", !GBL_CM_Translate);

	// Deal with the separator
	conSubSep.setAttribute("hidden", !(GBL_CM_Web || GBL_CM_Site || GBL_CM_Images || GBL_CM_Video || GBL_CM_Groups || GBL_CM_Maps || GBL_CM_Answers) ||
						   !(GBL_CM_Backward || GBL_CM_Cached || GBL_CM_CachedLink || GBL_CM_Similar || GBL_CM_Translate));

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
	var url = GBL_ConvertToURL(window.content.document.location.href);

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

}

function GBL_UpdateContextMenuVisibility()
{
	var conMenu = document.getElementById("GBL-Context-Menu");
	var conSep = document.getElementById("GBL-Context-Separator");

	conMenu.setAttribute("collapsed", !GBL_CM_ShowContext);
	conSep.setAttribute("hidden", !GBL_CM_ShowContext);
}

function GBL_UpdateOverflowMenu()
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
}

function GBL_UpdateSearchBoxSettings()
{
	var searchBox = document.getElementById("GBL-SearchBox");
	
	searchBox.setAttribute("enablehistory", GBL_MaintainHistory);

	if(GBL_MaintainHistory)
	{
		searchBox.setAttribute("completedefaultindex", GBL_UseInlineComplete);
		searchBox.setAttribute("disableautocomplete", !GBL_EnableAutoComplete);
	}
	else
	{
		searchBox.setAttribute("completedefaultindex", false);
		searchBox.setAttribute("disableautocomplete", true);
	}
}

function GBL_UpdateSearchWordButtons()
{
	GBL_ClearSearchWordButtons();
	GBL_AddSearchWordButton(GBL_GetSearchTerms());
}

function GBL_UpdateUpMenu()
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
		tempItem.setAttribute("oncommand", "GBL_Up(event, '" + currentPath + "'); event.stopPropagation();");
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
		tempNode = document.createElement("menuitem");
		tempNode.setAttribute("label", topHost);
		tempNode.setAttribute("oncommand", "GBL_Up(event, '" + topHost + "'); event.stopPropagation();");
		tempNode.setAttribute("onclick", "checkForMiddleClick(this, event); event.stopPropagation();");
		upMenu.appendChild(tempNode);
	}

	if(upMenu.childNodes.length > 0)
		document.getElementById("GBL-TB-UpButton").setAttribute("disabled", false);
	else
		document.getElementById("GBL-TB-UpButton").setAttribute("disabled", true);
}

function GBL_ValidateSearchHistorySetting()
{
	if(GBL_WarnOnFormHistory)
	{
		var b = GBL_PrefService.getBranch("browser.");

		// Only case we care about is where form history is disabled, and search history is enabled
		if(b.getBoolPref("formfill.enable") == false && GBL_Branch.getBoolPref(GBL_PrefName_MaintainHistory) == true)
		{
			window.openDialog("chrome://googlebarlite/content/formhistory.xul", "Warning: Form History", "centerscreen,chrome,modal");
		}
	}
}
