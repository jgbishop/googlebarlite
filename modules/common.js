var EXPORTED_SYMBOLS = ["GooglebarLiteCommon"];

Components.utils.import('resource://gre/modules/devtools/Console.jsm');

if (typeof(GooglebarLiteCommon) === "undefined")
{
	var GooglebarLiteCommon = {};
}

GooglebarLiteCommon.Data = {
	Prefs: {
		// General
		SiteToUse: { name: "site_to_use", value: "", type: "complex"},
		ClickSelectsAll: { name: "click_selects_all", value: false},
		SearchInTab: { name: "search_in_tab", value: false},
		RememberCombined: { name: "remember_combined", value: false},
		SearchOnDragDrop: { name: "search_on_drag_drop", value: false},
		DisableAutoCorrect: { name: "disable_auto_correct", value: false},
		UseSecureSearch: { name: "use_secure_search", value: false},
		SearchBoxWidth: { name: "search_box_width", value: 250, type: "int"},

		// Search history
		WarnOnFormHistory: { name: "warn_on_form_history", value: false},
		MaintainHistory: { name: "maintain_history", value: false},
		EnableAutoComplete: { name: "enable_auto_complete", value: false},
		UseInlineComplete: { name: "use_inline_complete", value: false},
		AutoSearch: { name: "auto_search", value: false},
		PromptToClear: { name: "prompt_to_clear", value: false},
		IgnoreDictionary: { name: "ignore_dictionary", value: false},

		// Toolbar buttons
		TB_ShowLabels: { name: "buttons.showlabels", value: false},
		TB_ShowUp: { name: "buttons.up", value: false, xulid: "GBL-TB-UpButton"},
		TB_ShowHighlighter: { name: "buttons.highlighter", value: false, xulid: "GBL-TB-Highlighter"},
		TB_ShowSearchWords: { name: "buttons.searchwords", value: false, xulid: "GBL-TB-SearchWordsContainer"},
		TB_ShowCombined: { name: "buttons.combined", value: false, xulid: "GBL-TB-Combined"},
		TB_ShowWeb: { name: "buttons.web", value: false, xulid: "GBL-TB-Web"},
		TB_ShowLucky: { name: "buttons.lucky", value: false, xulid: "GBL-TB-Lucky"},
		TB_ShowSite: { name: "buttons.site", value: false, xulid: "GBL-TB-Site"},
		TB_ShowImages: { name: "buttons.images", value: false, xulid: "GBL-TB-Images"},
		TB_ShowVideo: { name: "buttons.video", value: false, xulid: "GBL-TB-Video"},
		TB_ShowNews: { name: "buttons.news", value: false, xulid: "GBL-TB-News"},
		TB_ShowMaps: { name: "buttons.maps", value: false, xulid: "GBL-TB-Maps"},
		TB_ShowShopping: { name: "buttons.shopping", value: false, xulid: "GBL-TB-Shopping"},
		TB_ShowGroups: { name: "buttons.groups", value: false, xulid: "GBL-TB-Groups"},
		TB_ShowBlog: { name: "buttons.blog", value: false, xulid: "GBL-TB-Blog"},
		TB_ShowBook: { name: "buttons.book", value: false, xulid: "GBL-TB-Book"},
		TB_ShowFinance: { name: "buttons.finance", value: false, xulid: "GBL-TB-Finance"},
		TB_ShowScholar: { name: "buttons.scholar", value: false, xulid: "GBL-TB-Scholar"},
		TB_ShowDictionary: { name: "buttons.dictionary", value: false, xulid: "GBL-TB-Dictionary"},

		// Keyboard shortcuts
		ShortcutCtrl: { name: "shortcut_ctrl", value: false },
		ShortcutAlt: { name: "shortcut_alt", value: false },
		ShortcutShift: { name: "shortcut_shift", value: false },
		FocusKey: { name: "focus_key", value: "", type: "string"},
		ShiftSearch: { name: "shift_search", value: "", type: "string"},
		CtrlSearch: { name: "ctrl_search", value: "", type: "string"},
		ShiftCtrlSearch: { name: "shift_ctrl_search", value: "", type: "string"},

		// Context menu
		CM_ShowContext: { name: "context.showcontext", value: false},
		CM_Web: { name: "context.web", value: false},
		CM_Site: { name: "context.site", value: false},
		CM_Images: { name: "context.images", value: false},
		CM_Video: { name: "context.video", value: false},
		CM_Groups: { name: "context.groups", value: false},
		CM_Maps: { name: "context.maps", value: false},
		CM_Dictionary: { name: "context.dictionary", value: false},
		CM_Backward: { name: "context.backward", value: false},
		CM_Cached: { name: "context.cached", value: false},
		CM_CachedLink: { name: "context.cachedlink", value: false},
		CM_Similar: { name: "context.similar", value: false},
		CM_Translate: { name: "context.translate", value: false}
	}
};

GooglebarLiteCommon.Func = {
	Log: function(aMessage)
	{
		console.log('Googlebar_Lite: ' + aMessage);
	},
	
	LogRaw: function(data)
	{
		console.log(data);
	}
};
