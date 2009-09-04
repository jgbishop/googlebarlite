var objGooglebarLiteOptions = {
	LoadOptions: function()
	{
		const oGBL = objGooglebarLite;
		const b = oGBL.PrefBranch;

		// General
		document.getElementById("GBL-Opt-SiteToUse").value				= b.getComplexValue(oGBL.PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString).data;
		document.getElementById("GBL-Opt-ClickSelectsAll").checked		= b.getBoolPref(oGBL.PrefName_ClickSelectsAll);
		document.getElementById("GBL-Opt-SearchInTab").checked 			= b.getBoolPref(oGBL.PrefName_SearchInTab);
		document.getElementById("GBL-Opt-RememberCombined").checked 	= b.getBoolPref(oGBL.PrefName_RememberCombined);
		document.getElementById("GBL-Opt-SearchOnDragDrop").checked		= b.getBoolPref(oGBL.PrefName_SearchOnDragDrop);
		document.getElementById("GBL-Opt-WarnOnFormHistory").checked	= b.getBoolPref(oGBL.PrefName_WarnOnFormHistory);
		document.getElementById("GBL-Opt-MaintainHistory").checked		= b.getBoolPref(oGBL.PrefName_MaintainHistory);
		document.getElementById("GBL-Opt-EnableAutoComplete").checked	= b.getBoolPref(oGBL.PrefName_EnableAutoComplete);
		document.getElementById("GBL-Opt-UseInlineComplete").checked	= b.getBoolPref(oGBL.PrefName_UseInlineComplete);
		document.getElementById("GBL-Opt-AutoSearch").checked 			= b.getBoolPref(oGBL.PrefName_AutoSearch);
		document.getElementById("GBL-Opt-PromptToClearHistory").checked = b.getBoolPref(oGBL.PrefName_PromptToClear);
		document.getElementById("GBL-Opt-IgnoreAnswers").checked 		= b.getBoolPref(oGBL.PrefName_IgnoreAnswers);

		// Toolbar buttons
		document.getElementById("GBL-Opt-TB-ShowLabels").checked 	= b.getBoolPref(oGBL.PrefName_TB_ShowLabels);
		document.getElementById("GBL-Opt-TB-Up").checked 			= b.getBoolPref(oGBL.PrefName_TB_Up);
		document.getElementById("GBL-Opt-TB-Highlighter").checked 	= b.getBoolPref(oGBL.PrefName_TB_Highlighter);
		document.getElementById("GBL-Opt-TB-SearchWords").checked 	= b.getBoolPref(oGBL.PrefName_TB_SearchWords);
		document.getElementById("GBL-Opt-TB-Combined").checked 		= b.getBoolPref(oGBL.PrefName_TB_Combined);
		document.getElementById("GBL-Opt-TB-WebSearch").checked 	= b.getBoolPref(oGBL.PrefName_TB_Web);
		document.getElementById("GBL-Opt-TB-Lucky").checked 		= b.getBoolPref(oGBL.PrefName_TB_Lucky);
		document.getElementById("GBL-Opt-TB-Site").checked 			= b.getBoolPref(oGBL.PrefName_TB_Site);
		document.getElementById("GBL-Opt-TB-Images").checked 		= b.getBoolPref(oGBL.PrefName_TB_Images);
		document.getElementById("GBL-Opt-TB-Video").checked 		= b.getBoolPref(oGBL.PrefName_TB_Video);
		document.getElementById("GBL-Opt-TB-News").checked 			= b.getBoolPref(oGBL.PrefName_TB_News);
		document.getElementById("GBL-Opt-TB-Maps").checked			= b.getBoolPref(oGBL.PrefName_TB_Maps);
		document.getElementById("GBL-Opt-TB-Shopping").checked		= b.getBoolPref(oGBL.PrefName_TB_Shopping);
		document.getElementById("GBL-Opt-TB-Groups").checked 		= b.getBoolPref(oGBL.PrefName_TB_Groups);
		document.getElementById("GBL-Opt-TB-Blog").checked	 		= b.getBoolPref(oGBL.PrefName_TB_Blog);
		document.getElementById("GBL-Opt-TB-Book").checked 			= b.getBoolPref(oGBL.PrefName_TB_Book);
		document.getElementById("GBL-Opt-TB-Finance").checked		= b.getBoolPref(oGBL.PrefName_TB_Finance);
		document.getElementById("GBL-Opt-TB-Scholar").checked		= b.getBoolPref(oGBL.PrefName_TB_Scholar);
		document.getElementById("GBL-Opt-TB-Answers").checked		= b.getBoolPref(oGBL.PrefName_TB_Answers);

		// Search modifiers
		document.getElementById("GBL-Opt-SearchBoxFocusKey").value	= b.getCharPref(oGBL.PrefName_FocusKey);
		document.getElementById("GBL-Opt-ShiftSearch").value 		= b.getCharPref(oGBL.PrefName_ShiftSearch);
		document.getElementById("GBL-Opt-CtrlSearch").value 		= b.getCharPref(oGBL.PrefName_CtrlSearch);
		document.getElementById("GBL-Opt-ShiftCtrlSearch").value 	= b.getCharPref(oGBL.PrefName_ShiftCtrlSearch);

		// Context menu
		document.getElementById("GBL-Opt-CM-ShowContext").checked	= b.getBoolPref(oGBL.PrefName_CM_ShowContext);
		document.getElementById("GBL-Opt-CM-Web").checked			= b.getBoolPref(oGBL.PrefName_CM_Web);
		document.getElementById("GBL-Opt-CM-Site").checked			= b.getBoolPref(oGBL.PrefName_CM_Site);
		document.getElementById("GBL-Opt-CM-Images").checked		= b.getBoolPref(oGBL.PrefName_CM_Images);
		document.getElementById("GBL-Opt-CM-Video").checked			= b.getBoolPref(oGBL.PrefName_CM_Video);
		document.getElementById("GBL-Opt-CM-Groups").checked 		= b.getBoolPref(oGBL.PrefName_CM_Groups);
		document.getElementById("GBL-Opt-CM-Maps").checked			= b.getBoolPref(oGBL.PrefName_CM_Maps);
		document.getElementById("GBL-Opt-CM-Answers").checked 		= b.getBoolPref(oGBL.PrefName_CM_Answers);
		document.getElementById("GBL-Opt-CM-Backward").checked 		= b.getBoolPref(oGBL.PrefName_CM_Backward);
		document.getElementById("GBL-Opt-CM-Cached").checked 		= b.getBoolPref(oGBL.PrefName_CM_Cached);
		document.getElementById("GBL-Opt-CM-CachedLink").checked	= b.getBoolPref(oGBL.PrefName_CM_CachedLink);
		document.getElementById("GBL-Opt-CM-Similar").checked 		= b.getBoolPref(oGBL.PrefName_CM_Similar);
		document.getElementById("GBL-Opt-CM-Translate").checked 	= b.getBoolPref(oGBL.PrefName_CM_Translate);

		// Update control status
		this.UpdateUseInlineCompleteStatus();
		this.UpdateSearchHistoryStatus();
	},
	
	SaveOptions: function()
	{
		const oGBL = objGooglebarLite;
		const b = oGBL.PrefBranch;

		// General
		try
		{
			var siteToUseObject = b.getComplexValue(oGBL.PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString);
			siteToUseObject.data = document.getElementById("GBL-Opt-SiteToUse").value;
			b.setComplexValue(oGBL.PrefName_SiteToUse, Components.interfaces.nsIPrefLocalizedString, siteToUseObject);
		}
		catch (ex)
		{
			oGBL.Log("Exception caught while attempting to save 'site to use' preference: " + ex);
		}

		b.setBoolPref(oGBL.PrefName_ClickSelectsAll, document.getElementById("GBL-Opt-ClickSelectsAll").checked);
		b.setBoolPref(oGBL.PrefName_SearchInTab, document.getElementById("GBL-Opt-SearchInTab").checked);
		b.setBoolPref(oGBL.PrefName_RememberCombined, document.getElementById("GBL-Opt-RememberCombined").checked);
		b.setBoolPref(oGBL.PrefName_SearchOnDragDrop, document.getElementById("GBL-Opt-SearchOnDragDrop").checked);
		b.setBoolPref(oGBL.PrefName_TB_ShowLabels, document.getElementById("GBL-Opt-TB-ShowLabels").checked);
		b.setBoolPref(oGBL.PrefName_TB_Up, document.getElementById("GBL-Opt-TB-Up").checked);
		b.setBoolPref(oGBL.PrefName_TB_Highlighter, document.getElementById("GBL-Opt-TB-Highlighter").checked);
		b.setBoolPref(oGBL.PrefName_TB_SearchWords, document.getElementById("GBL-Opt-TB-SearchWords").checked);

		// Toolbar buttons
		b.setBoolPref(oGBL.PrefName_TB_Combined, document.getElementById("GBL-Opt-TB-Combined").checked);
		b.setBoolPref(oGBL.PrefName_TB_Web, document.getElementById("GBL-Opt-TB-WebSearch").checked);
		b.setBoolPref(oGBL.PrefName_TB_Lucky, document.getElementById("GBL-Opt-TB-Lucky").checked);
		b.setBoolPref(oGBL.PrefName_TB_Site, document.getElementById("GBL-Opt-TB-Site").checked);
		b.setBoolPref(oGBL.PrefName_TB_Images, document.getElementById("GBL-Opt-TB-Images").checked);
		b.setBoolPref(oGBL.PrefName_TB_Video, document.getElementById("GBL-Opt-TB-Video").checked);
		b.setBoolPref(oGBL.PrefName_TB_News, document.getElementById("GBL-Opt-TB-News").checked);
		b.setBoolPref(oGBL.PrefName_TB_Maps, document.getElementById("GBL-Opt-TB-Maps").checked);
		b.setBoolPref(oGBL.PrefName_TB_Shopping, document.getElementById("GBL-Opt-TB-Shopping").checked);
		b.setBoolPref(oGBL.PrefName_TB_Groups, document.getElementById("GBL-Opt-TB-Groups").checked);
		b.setBoolPref(oGBL.PrefName_TB_Blog, document.getElementById("GBL-Opt-TB-Blog").checked);
		b.setBoolPref(oGBL.PrefName_TB_Book, document.getElementById("GBL-Opt-TB-Book").checked);
		b.setBoolPref(oGBL.PrefName_TB_Finance, document.getElementById("GBL-Opt-TB-Finance").checked);
		b.setBoolPref(oGBL.PrefName_TB_Scholar, document.getElementById("GBL-Opt-TB-Scholar").checked);
		b.setBoolPref(oGBL.PrefName_TB_Answers, document.getElementById("GBL-Opt-TB-Answers").checked);

		// Search history
		b.setBoolPref(oGBL.PrefName_WarnOnFormHistory, document.getElementById("GBL-Opt-WarnOnFormHistory").checked);
		b.setBoolPref(oGBL.PrefName_MaintainHistory, document.getElementById("GBL-Opt-MaintainHistory").checked);
		b.setBoolPref(oGBL.PrefName_EnableAutoComplete, document.getElementById("GBL-Opt-EnableAutoComplete").checked);
		b.setBoolPref(oGBL.PrefName_UseInlineComplete, document.getElementById("GBL-Opt-UseInlineComplete").checked);
		b.setBoolPref(oGBL.PrefName_AutoSearch, document.getElementById("GBL-Opt-AutoSearch").checked);
		b.setBoolPref(oGBL.PrefName_PromptToClear, document.getElementById("GBL-Opt-PromptToClearHistory").checked);
		b.setBoolPref(oGBL.PrefName_IgnoreAnswers, document.getElementById("GBL-Opt-IgnoreAnswers").checked);

		// Keyboard shortcuts
		b.setCharPref(oGBL.PrefName_FocusKey, document.getElementById("GBL-Opt-SearchBoxFocusKey").value);
		b.setCharPref(oGBL.PrefName_ShiftSearch, document.getElementById("GBL-Opt-ShiftSearch").value);
		b.setCharPref(oGBL.PrefName_CtrlSearch, document.getElementById("GBL-Opt-CtrlSearch").value);
		b.setCharPref(oGBL.PrefName_ShiftCtrlSearch, document.getElementById("GBL-Opt-ShiftCtrlSearch").value);

		// Context menu
		b.setBoolPref(oGBL.PrefName_CM_ShowContext, document.getElementById("GBL-Opt-CM-ShowContext").checked);
		b.setBoolPref(oGBL.PrefName_CM_Web, document.getElementById("GBL-Opt-CM-Web").checked);
		b.setBoolPref(oGBL.PrefName_CM_Site, document.getElementById("GBL-Opt-CM-Site").checked);
		b.setBoolPref(oGBL.PrefName_CM_Images, document.getElementById("GBL-Opt-CM-Images").checked);
		b.setBoolPref(oGBL.PrefName_CM_Video, document.getElementById("GBL-Opt-CM-Video").checked);
		b.setBoolPref(oGBL.PrefName_CM_Groups, document.getElementById("GBL-Opt-CM-Groups").checked);
		b.setBoolPref(oGBL.PrefName_CM_Maps, document.getElementById("GBL-Opt-CM-Maps").checked);
		b.setBoolPref(oGBL.PrefName_CM_Answers, document.getElementById("GBL-Opt-CM-Answers").checked);
		b.setBoolPref(oGBL.PrefName_CM_Backward, document.getElementById("GBL-Opt-CM-Backward").checked);
		b.setBoolPref(oGBL.PrefName_CM_Cached, document.getElementById("GBL-Opt-CM-Cached").checked);
		b.setBoolPref(oGBL.PrefName_CM_CachedLink, document.getElementById("GBL-Opt-CM-CachedLink").checked);
		b.setBoolPref(oGBL.PrefName_CM_Similar, document.getElementById("GBL-Opt-CM-Similar").checked);
		b.setBoolPref(oGBL.PrefName_CM_Translate, document.getElementById("GBL-Opt-CM-Translate").checked);

		try
		{
			var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
			var e = wm.getEnumerator("navigator:browser");
			var win;

			while(e.hasMoreElements())
			{
				win = e.getNext();
				win.objGooglebarLite.OptionsHaveUpdated();
			}
		} catch (e) {}
	},
	
	UpdateUseInlineCompleteStatus: function()
	{
		var disabled = true;

		if(document.getElementById("GBL-Opt-EnableAutoComplete").checked)
			disabled = false;

		document.getElementById("GBL-Opt-UseInlineComplete").disabled = disabled;
	},
	
	UpdateSearchHistoryStatus: function()
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
};

