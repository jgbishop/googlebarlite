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
	
		var windowService = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
		var currentWindow = windowService.getMostRecentWindow("navigator:browser");
	
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

