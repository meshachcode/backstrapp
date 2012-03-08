/** 
	* Backstrapp Permissions.
	* NOTE: is it possible to load these from an external source? 
	* Maybe this should all be handled at the server-level (eventually).
*/
define([], function () {

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.
	var permissions = permissions || {};

	permissions.rules = {
		// pageModule Events
		pageModuleRenderReady: {
			pageModule:true
		},

		pageModuleRenderComplete: {
			pageModule:true
		},

		pageModuleInitComplete: {
			pageModule:true
		},

		pageModuleLoadReady: {
			pageModule:true
		},

		pageModuleRouterEvent: {
			pageModule:true
		},

		pageModulePageReady: {
			pageModule:true,
			navModule:true
		},

		// navModule Events
		navModuleRenderReady: {
			navModule:true
		},

		navModuleRenderComplete: {
			navModule:true
		},
		
		navModuleInitComplete: {
			navModule:true
		},
		
		navModuleLoadReady: {
			navModule:true
		}
	};

	/**
     * @param {string} subscriber Module name
     * @param {string} channel Event name
     */
	permissions.validate = function(subscriber, channel){
		var test = permissions.rules[channel][subscriber];
		return test === undefined ? false : test;
	};

	return permissions;
});