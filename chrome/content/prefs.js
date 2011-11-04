var objGooglebarLitePrefs = {
	InitUI: function() {
		this.UpdateUseInlineCompleteStatus();
		this.UpdateSearchHistoryStatus();
		this.UpdateShowContextMenuStatus();
	},
	
	UpdateUseInlineCompleteStatus: function() {
		var disabled = ! document.getElementById("GBL-Opt-EnableAutoComplete").checked;
		document.getElementById("GBL-Opt-UseInlineComplete").disabled = disabled;
	},
	
	UpdateSearchHistoryStatus: function() {
		var disabled = ! document.getElementById("GBL-Opt-MaintainHistory").checked;

		document.getElementById("GBL-Opt-EnableAutoComplete").disabled = disabled;
		if(document.getElementById("GBL-Opt-EnableAutoComplete").checked)
			document.getElementById("GBL-Opt-UseInlineComplete").disabled = disabled;
		document.getElementById("GBL-Opt-AutoSearch").disabled = disabled;
		document.getElementById("GBL-Opt-PromptToClearHistory").disabled = disabled;
		document.getElementById("GBL-Opt-IgnoreDictionary").disabled = disabled;
	},
	
	UpdateShowContextMenuStatus: function() {
		var disabled = ! document.getElementById("GBL-Opt-CM-ShowContext").checked;
		
		objGooglebarLite.Log("Disabled = " + disabled);
		
		document.getElementById("GBL-Opt-CM-Web").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Site").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Images").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Video").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Maps").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Groups").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Dictionary").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Backward").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Cached").disabled = disabled;
		document.getElementById("GBL-Opt-CM-CachedLink").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Similar").disabled = disabled;
		document.getElementById("GBL-Opt-CM-Translate").disabled = disabled;
	}
};
