const { Cc, Ci, Cu } = require('chrome');

Cu.import("resource://gre/modules/FileUtils.jsm");

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var videosites = [
    "https://www.youtube.de/watch?v=",
    "https://www.youtube.com/watch?v=",
    "http://www.youtube.de/watch?v=",
    "http://www.youtube.com/watch?v="
];

var button = buttons.ActionButton({
  id: "playPause",
  label: "Toogle: Play - Pause",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

require("sdk/tabs").on("ready", logURL);
var notifications = require("sdk/notifications");
 
function logURL(tab) {
	
	if(tabs.activeTab.id == tab.id)
	{
		var i;
		for (i = 0; i < videosites.length; ++i)
		{
			if(tab.url.indexOf(videosites[i]) >= 0)
			{
				muteMusic();				
			}
		}
	}
}
function muteMusic() {
	var osString = Cc["@mozilla.org/xre/app-info;1"]  
                   .getService(Ci.nsIXULRuntime).OS;
	
	if(osString.indexOf("WINNT"))
	{
		//Windows
		var env = Cc["@mozilla.org/process/environment;1"]
				.getService(Ci.nsIEnvironment);
		var shell = new FileUtils.File("/bin/sh");
		var args = ["-c", "NirCmd.exe muteappvolume wmplayer.exe 1"];

		var process = Cc["@mozilla.org/process/util;1"]
				.createInstance(Ci.nsIProcess);
		process.init(shell);
		process.runAsync(args, args.length);
	}
	if(osString.indexOf("Linux"))
	{
		//Linux
		var env = Cc["@mozilla.org/process/environment;1"]
			.getService(Ci.nsIEnvironment);
		var shell = new FileUtils.File("/bin/sh");
		var args = ["-c", "rhythmbox-client --pause"];

		var process = Cc["@mozilla.org/process/util;1"]
							.createInstance(Ci.nsIProcess);
		process.init(shell);
		process.runAsync(args, args.length); 
	}
}

function handleClick(state) {
	var osString = Cclasses["@mozilla.org/xre/app-info;1"]  
                   .getService(Cinterfaces.nsIXULRuntime).OS;
	
	if(osString.indexOf("WINNT"))
	{
		//Windows
		var env = Cc["@mozilla.org/process/environment;1"]
				.getService(Ci.nsIEnvironment);
		var shell = new FileUtils.File("/bin/sh");
		var args = ["-c", "NirCmd.exe muteappvolume wmplayer.exe 2"];

		var process = Cc["@mozilla.org/process/util;1"]
				.createInstance(Ci.nsIProcess);
		process.init(shell);
		process.runAsync(args, args.length);
		
	}
	if(osString.indexOf("Linux"))
	{
		//Linux
		var env = Cc["@mozilla.org/process/environment;1"]
				.getService(Ci.nsIEnvironment);
		var shell = new FileUtils.File("/bin/sh");
		var args = ["-c", "rhythmbox-client --play-pause"];

		var process = Cc["@mozilla.org/process/util;1"]
				.createInstance(Ci.nsIProcess);
		process.init(shell);
		process.runAsync(args, args.length);
	}
	
}
