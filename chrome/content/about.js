// Import the Services module for future use, if we're not in a browser window where it's already loaded
Components.utils.import('resource://gre/modules/Services.jsm');

var objGooglebarLiteAboutDialog = {
	OpenAboutLink: function(type)
	{
		var url = "";
	
		switch(type)
		{
		case 'homepage':
			url = "http://www.borngeek.com/firefox/googlebarlite/";
			break;
	
		case 'jonah':
			url = "http://www.borngeek.com/about/";
			break;
	
		case 'doc':
			url = "http://www.borngeek.com/firefox/googlebarlite/doc/";
			break;
		}
	
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

