function GBL_LoadOptions()
{
	const prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	const branch = prefService.getBranch("googlebar_lite.");

	// General
	document.getElementById("GBL-Opt-SiteToUse").value				= branch.getComplexValue(GBL_PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString).data;
	document.getElementById("GBL-Opt-ClickSelectsAll").checked		= branch.getBoolPref(GBL_PrefName_ClickSelectsAll);
	document.getElementById("GBL-Opt-SearchInTab").checked 			= branch.getBoolPref(GBL_PrefName_SearchInTab);
	document.getElementById("GBL-Opt-RememberCombined").checked 	= branch.getBoolPref(GBL_PrefName_RememberCombined);
	document.getElementById("GBL-Opt-SearchOnDragDrop").checked		= branch.getBoolPref(GBL_PrefName_SearchOnDragDrop);
	document.getElementById("GBL-Opt-WarnOnFormHistory").checked	= branch.getBoolPref(GBL_PrefName_WarnOnFormHistory);
	document.getElementById("GBL-Opt-MaintainHistory").checked		= branch.getBoolPref(GBL_PrefName_MaintainHistory);
	document.getElementById("GBL-Opt-EnableAutoComplete").checked	= branch.getBoolPref(GBL_PrefName_EnableAutoComplete);
	document.getElementById("GBL-Opt-UseInlineComplete").checked	= branch.getBoolPref(GBL_PrefName_UseInlineComplete);
	document.getElementById("GBL-Opt-AutoSearch").checked 			= branch.getBoolPref(GBL_PrefName_AutoSearch);
	document.getElementById("GBL-Opt-PromptToClearHistory").checked = branch.getBoolPref(GBL_PrefName_PromptToClear);
	document.getElementById("GBL-Opt-IgnoreAnswers").checked 		= branch.getBoolPref(GBL_PrefName_IgnoreAnswers);

	// Toolbar buttons
	document.getElementById("GBL-Opt-TB-ShowLabels").checked 	= branch.getBoolPref(GBL_PrefName_TB_ShowLabels);
	document.getElementById("GBL-Opt-TB-Up").checked 			= branch.getBoolPref(GBL_PrefName_TB_Up);
	document.getElementById("GBL-Opt-TB-Highlighter").checked 	= branch.getBoolPref(GBL_PrefName_TB_Highlighter);
	document.getElementById("GBL-Opt-TB-SearchWords").checked 	= branch.getBoolPref(GBL_PrefName_TB_SearchWords);
	document.getElementById("GBL-Opt-TB-Combined").checked 		= branch.getBoolPref(GBL_PrefName_TB_Combined);
	document.getElementById("GBL-Opt-TB-WebSearch").checked 	= branch.getBoolPref(GBL_PrefName_TB_Web);
	document.getElementById("GBL-Opt-TB-Lucky").checked 		= branch.getBoolPref(GBL_PrefName_TB_Lucky);
	document.getElementById("GBL-Opt-TB-Site").checked 			= branch.getBoolPref(GBL_PrefName_TB_Site);
	document.getElementById("GBL-Opt-TB-Images").checked 		= branch.getBoolPref(GBL_PrefName_TB_Images);
	document.getElementById("GBL-Opt-TB-Video").checked 		= branch.getBoolPref(GBL_PrefName_TB_Video);
	document.getElementById("GBL-Opt-TB-News").checked 			= branch.getBoolPref(GBL_PrefName_TB_News);
	document.getElementById("GBL-Opt-TB-Maps").checked			= branch.getBoolPref(GBL_PrefName_TB_Maps);
	document.getElementById("GBL-Opt-TB-Shopping").checked		= branch.getBoolPref(GBL_PrefName_TB_Shopping);
	document.getElementById("GBL-Opt-TB-Groups").checked 		= branch.getBoolPref(GBL_PrefName_TB_Groups);
	document.getElementById("GBL-Opt-TB-Blog").checked	 		= branch.getBoolPref(GBL_PrefName_TB_Blog);
	document.getElementById("GBL-Opt-TB-Book").checked 			= branch.getBoolPref(GBL_PrefName_TB_Book);
	document.getElementById("GBL-Opt-TB-Finance").checked		= branch.getBoolPref(GBL_PrefName_TB_Finance);
	document.getElementById("GBL-Opt-TB-Scholar").checked		= branch.getBoolPref(GBL_PrefName_TB_Scholar);
	document.getElementById("GBL-Opt-TB-Answers").checked		= branch.getBoolPref(GBL_PrefName_TB_Answers);

	// Search modifiers
	document.getElementById("GBL-Opt-SearchBoxFocusKey").value	= branch.getCharPref(GBL_PrefName_FocusKey);
	document.getElementById("GBL-Opt-ShiftSearch").value 		= branch.getCharPref(GBL_PrefName_ShiftSearch);
	document.getElementById("GBL-Opt-CtrlSearch").value 		= branch.getCharPref(GBL_PrefName_CtrlSearch);
	document.getElementById("GBL-Opt-ShiftCtrlSearch").value 	= branch.getCharPref(GBL_PrefName_ShiftCtrlSearch);

	// Context menu
	document.getElementById("GBL-Opt-CM-ShowContext").checked	= branch.getBoolPref(GBL_PrefName_CM_ShowContext);
	document.getElementById("GBL-Opt-CM-Web").checked			= branch.getBoolPref(GBL_PrefName_CM_Web);
	document.getElementById("GBL-Opt-CM-Site").checked			= branch.getBoolPref(GBL_PrefName_CM_Site);
	document.getElementById("GBL-Opt-CM-Images").checked		= branch.getBoolPref(GBL_PrefName_CM_Images);
	document.getElementById("GBL-Opt-CM-Video").checked			= branch.getBoolPref(GBL_PrefName_CM_Video);
	document.getElementById("GBL-Opt-CM-Groups").checked 		= branch.getBoolPref(GBL_PrefName_CM_Groups);
	document.getElementById("GBL-Opt-CM-Maps").checked			= branch.getBoolPref(GBL_PrefName_CM_Maps);
	document.getElementById("GBL-Opt-CM-Answers").checked 		= branch.getBoolPref(GBL_PrefName_CM_Answers);
	document.getElementById("GBL-Opt-CM-Backward").checked 		= branch.getBoolPref(GBL_PrefName_CM_Backward);
	document.getElementById("GBL-Opt-CM-Cached").checked 		= branch.getBoolPref(GBL_PrefName_CM_Cached);
	document.getElementById("GBL-Opt-CM-CachedLink").checked	= branch.getBoolPref(GBL_PrefName_CM_CachedLink);
	document.getElementById("GBL-Opt-CM-Similar").checked 		= branch.getBoolPref(GBL_PrefName_CM_Similar);
	document.getElementById("GBL-Opt-CM-Translate").checked 	= branch.getBoolPref(GBL_PrefName_CM_Translate);

	// Update control status
    GBL_UpdateUseInlineCompleteStatus();
	GBL_UpdateSearchHistoryStatus();
}

function GBL_SaveOptions()
{
	const prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
	const branch = prefService.getBranch("googlebar_lite.");

	// General
	try
	{
		var siteToUseObject = branch.getComplexValue(GBL_PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString);
		siteToUseObject.data = document.getElementById("GBL-Opt-SiteToUse").value;
		branch.setComplexValue(GBL_PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString, siteToUseObject);
	}
	catch (ex)
	{
		GBL_Log("Exception caught while attempting to save 'site to use' preference: " + ex);
	}
	
	branch.setBoolPref(GBL_PrefName_ClickSelectsAll, document.getElementById("GBL-Opt-ClickSelectsAll").checked);
	branch.setBoolPref(GBL_PrefName_SearchInTab, document.getElementById("GBL-Opt-SearchInTab").checked);
	branch.setBoolPref(GBL_PrefName_RememberCombined, document.getElementById("GBL-Opt-RememberCombined").checked);
	branch.setBoolPref(GBL_PrefName_SearchOnDragDrop, document.getElementById("GBL-Opt-SearchOnDragDrop").checked);
	branch.setBoolPref(GBL_PrefName_TB_ShowLabels, document.getElementById("GBL-Opt-TB-ShowLabels").checked);
	branch.setBoolPref(GBL_PrefName_TB_Up, document.getElementById("GBL-Opt-TB-Up").checked);
	branch.setBoolPref(GBL_PrefName_TB_Highlighter, document.getElementById("GBL-Opt-TB-Highlighter").checked);
	branch.setBoolPref(GBL_PrefName_TB_SearchWords, document.getElementById("GBL-Opt-TB-SearchWords").checked);

	// Toolbar buttons
	branch.setBoolPref(GBL_PrefName_TB_Combined, document.getElementById("GBL-Opt-TB-Combined").checked);
	branch.setBoolPref(GBL_PrefName_TB_Web, document.getElementById("GBL-Opt-TB-WebSearch").checked);
	branch.setBoolPref(GBL_PrefName_TB_Lucky, document.getElementById("GBL-Opt-TB-Lucky").checked);
	branch.setBoolPref(GBL_PrefName_TB_Site, document.getElementById("GBL-Opt-TB-Site").checked);
	branch.setBoolPref(GBL_PrefName_TB_Images, document.getElementById("GBL-Opt-TB-Images").checked);
	branch.setBoolPref(GBL_PrefName_TB_Video, document.getElementById("GBL-Opt-TB-Video").checked);
	branch.setBoolPref(GBL_PrefName_TB_News, document.getElementById("GBL-Opt-TB-News").checked);
	branch.setBoolPref(GBL_PrefName_TB_Maps, document.getElementById("GBL-Opt-TB-Maps").checked);
	branch.setBoolPref(GBL_PrefName_TB_Shopping, document.getElementById("GBL-Opt-TB-Shopping").checked);
	branch.setBoolPref(GBL_PrefName_TB_Groups, document.getElementById("GBL-Opt-TB-Groups").checked);
	branch.setBoolPref(GBL_PrefName_TB_Blog, document.getElementById("GBL-Opt-TB-Blog").checked);
	branch.setBoolPref(GBL_PrefName_TB_Book, document.getElementById("GBL-Opt-TB-Book").checked);
	branch.setBoolPref(GBL_PrefName_TB_Finance, document.getElementById("GBL-Opt-TB-Finance").checked);
	branch.setBoolPref(GBL_PrefName_TB_Scholar, document.getElementById("GBL-Opt-TB-Scholar").checked);
	branch.setBoolPref(GBL_PrefName_TB_Answers, document.getElementById("GBL-Opt-TB-Answers").checked);

	// Search history
	branch.setBoolPref(GBL_PrefName_WarnOnFormHistory, document.getElementById("GBL-Opt-WarnOnFormHistory").checked);
	branch.setBoolPref(GBL_PrefName_MaintainHistory, document.getElementById("GBL-Opt-MaintainHistory").checked);
	branch.setBoolPref(GBL_PrefName_EnableAutoComplete, document.getElementById("GBL-Opt-EnableAutoComplete").checked);
	branch.setBoolPref(GBL_PrefName_UseInlineComplete, document.getElementById("GBL-Opt-UseInlineComplete").checked);
	branch.setBoolPref(GBL_PrefName_AutoSearch, document.getElementById("GBL-Opt-AutoSearch").checked);
	branch.setBoolPref(GBL_PrefName_PromptToClear, document.getElementById("GBL-Opt-PromptToClearHistory").checked);
	branch.setBoolPref(GBL_PrefName_IgnoreAnswers, document.getElementById("GBL-Opt-IgnoreAnswers").checked);

	// Keyboard shortcuts
	branch.setCharPref(GBL_PrefName_FocusKey, document.getElementById("GBL-Opt-SearchBoxFocusKey").value);
	branch.setCharPref(GBL_PrefName_ShiftSearch, document.getElementById("GBL-Opt-ShiftSearch").value);
	branch.setCharPref(GBL_PrefName_CtrlSearch, document.getElementById("GBL-Opt-CtrlSearch").value);
	branch.setCharPref(GBL_PrefName_ShiftCtrlSearch, document.getElementById("GBL-Opt-ShiftCtrlSearch").value);

	// Context menu
	branch.setBoolPref(GBL_PrefName_CM_ShowContext, document.getElementById("GBL-Opt-CM-ShowContext").checked);
	branch.setBoolPref(GBL_PrefName_CM_Web, document.getElementById("GBL-Opt-CM-Web").checked);
	branch.setBoolPref(GBL_PrefName_CM_Site, document.getElementById("GBL-Opt-CM-Site").checked);
	branch.setBoolPref(GBL_PrefName_CM_Images, document.getElementById("GBL-Opt-CM-Images").checked);
	branch.setBoolPref(GBL_PrefName_CM_Video, document.getElementById("GBL-Opt-CM-Video").checked);
	branch.setBoolPref(GBL_PrefName_CM_Groups, document.getElementById("GBL-Opt-CM-Groups").checked);
	branch.setBoolPref(GBL_PrefName_CM_Maps, document.getElementById("GBL-Opt-CM-Maps").checked);
	branch.setBoolPref(GBL_PrefName_CM_Answers, document.getElementById("GBL-Opt-CM-Answers").checked);
	branch.setBoolPref(GBL_PrefName_CM_Backward, document.getElementById("GBL-Opt-CM-Backward").checked);
	branch.setBoolPref(GBL_PrefName_CM_Cached, document.getElementById("GBL-Opt-CM-Cached").checked);
	branch.setBoolPref(GBL_PrefName_CM_CachedLink, document.getElementById("GBL-Opt-CM-CachedLink").checked);
	branch.setBoolPref(GBL_PrefName_CM_Similar, document.getElementById("GBL-Opt-CM-Similar").checked);
	branch.setBoolPref(GBL_PrefName_CM_Translate, document.getElementById("GBL-Opt-CM-Translate").checked);
	
	try
	{
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
		var e = wm.getEnumerator("navigator:browser");
		var win;

		while(e.hasMoreElements())
		{
			win = e.getNext();
			win.GBL_OptionsHaveUpdated();
		}
	} catch (e) {}
}

function GBL_UpdateUseInlineCompleteStatus()
{
	var disabled = true;

	if(document.getElementById("GBL-Opt-EnableAutoComplete").checked)
		disabled = false;

	document.getElementById("GBL-Opt-UseInlineComplete").disabled = disabled;
}

function GBL_UpdateSearchHistoryStatus()
{
	var disabled = true;
	if(document.getElementById("GBL-Opt-MaintainHistory").checked)
		disabled = false;

	document.getElementById("GBL-Opt-EnableAutoComplete").disabled = disabled;
	if(document.getElementById("GBL-Opt-EnableAutoComplete").checked)
		document.getElementById("GBL-Opt-UseInlineComplete").disabled = disabled;
	document.getElementById("GBL-Opt-AutoSearch").disabled = disabled;
	document.getElementById("GBL-Opt-PromptToClearHistory").disabled = disabled;
	document.getElementById("GBL-Opt-IgnoreAnswers").disabled = disabled;
}
