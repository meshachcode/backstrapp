/** 
	* Maestro Permissions 
*/

define([], function () {


	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.

	var permissions = {
		renderBackstrApp: {
			backstrApp:true
		},
		
		routerBackstrApp: {
			backstrApp:true
		},

		renderDone:{
			home:true,
			about:true
		},

		renderMessageModule:{
			messageModule:true
		},
		
		renderSongList: {
			songList: true
		},
		
		renderNavModule: {
			navModule:true
		},
		
		renderPageModule: {
			pageModule:true
		}
	};

	permissions.validate = function(subscriber, channel){
		var test = permissions[channel][subscriber];
		return test===undefined? false: test;
	};

	return permissions;

});