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
	
	permissions.setPermission = function (rule, module) {
		if (!permissions.rules[rule] || permissions.rules[rule] == undefined) {
			permissions.rules[rule] = {};
			permissions.rules[rule][module] = true;
		} else {
			if (!permissions.rules[rule].count || permissions.rules[rule].count == undefined) {
				permissions.rules[rule].count = 1;
			} else {
				permissions.rules[rule].count += 1;
			}
		}
		console.log('set Permission', permissions.rules, rule, module, permissions.rules[rule]);
		return permissions.rules[rule];
	}	

	return permissions;
});