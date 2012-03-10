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
		pageModuleInitComplete		: {
			pageModule:true
		},
		pageModuleStartComplete		: {
			pageModule:true
		},
		pageModuleStopComplete		: {
			pageModule:true
		},
		pageModuleProcessComplete 	: {
			pageModule:true
		},
		pageModuleLoadReady			: {
			pageModule:true
		},
		pageModuleLoadViewComplete	: {
			pageModule:true
		},
		pageModuleActivateComplete	: {
			pageModule:true
		},
		pageModuleSetHtmlComplete	: {
			pageModule:true
		},
		pageModuleRenderComplete	: {
			pageModule:true,
			navModule:true
		},
		pageModuleRouteComplete		: {
			pageModule:true
		},

		// navModule Events
		navModuleInitComplete		: {
			navModule:true
		},
		navModuleStartComplete		: {
			navModule:true
		},
		navModuleStopComplete		: {
			navModule:true
		},
		navModuleProcessComplete 	: {
			navModule:true
		},
		navModuleLoadReady			: {
			navModule:true
		},
		navModuleLoadViewComplete	: {
			navModule:true
		},
		navModuleActivateComplete	: {
			navModule:true
		},
		navModuleSetHtmlComplete	: {
			navModule:true
		},
		navModuleRenderComplete		: {
			navModule:true
		},
		navModuleRouteComplete		: {
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