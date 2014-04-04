Components.utils.import('resource://gre/modules/Services.jsm');

var objGooglebarLiteAboutDialog = {
	OpenAboutLink: function(type)
	{
		var url = "http://www.borngeek.com/";
		
		if(type == 'homepage')
			url += 'firefox/googlebarlite/';
		else if(type == 'jonah')
			url += 'about/';
		else if(type == 'doc')
			url += 'googlebarlite/doc/';
	
		var currentWindow = Services.wm.getMostRecentWindow("navigator:browser");
	
		if(currentWindow)
		{
			try {
				currentWindow.delayedOpenTab(url);
			} catch(e) {
				currentWindow.loadURI(url);
			}
		}
		else
			window.open(url);
	}
};

