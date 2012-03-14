/** 
	* Backstrapp Permissions.
	* NOTE: is it possible to load these from an external source? 
	* Maybe this should all be handled at the server-level (eventually).
*/
define(['jquery', 'core/mediator'], function ($, m) {

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.
	var permissions = permissions || {};

	permissions.defaultRules = {
		module: [
			'navModule',
			'pageModule'
		],
		event: [
			'init',
			'start', 
			'stop', 
			'load',
			'loadView',
			'setHtml',
			'process',
			'activate',
			'deactivate',
			'route',
			'render',
			'destroy',
			'click',
			'mouseon',
			'mouseoff'
		],
		request: [
			'publish', 
			'subscribe'
		],
		state: [
			'complete', 
			'ready' 
		]
	};

	permissions.rules = {};
	
	permissions.newRule = function (rule, modules) {
		if (!permissions.rules[rule]) {
			permissions.rules[rule] = {};
			for (var i in modules) {
				permissions.rules[rule][modules[i]] = true;
			}
		}
		console.log('new rule', permissions.rules[rule], permissions.rules);
	}
	
	/*
		* @method permissions.initRules
		* it's ugly, but it works for now. saves hard-coding new modules in batches, 
		* or having to manage multiple permissions files. Instead, this uses the 
		* above permissions.defaultRules object, and assigns each module with permission
		* to pub/sub with themselves. Cross-polinating modules should be hard-coded into 
		* the .rules object to keep things easy to find for now.
	*/
	permissions.getDefaultRules = function () {
		var ret = {};
		for (var i in permissions.defaultRules.module) {
			for (var j in permissions.defaultRules.event) {
				var event = permissions.defaultRules.module[i] + m.util.camelize(permissions.defaultRules.event[j]);
				for (var k in permissions.defaultRules.state) {
					var rule = event + m.util.camelize(permissions.defaultRules.state[k]);
					ret[rule] = {};
					ret[rule][permissions.defaultRules.module[i]] = true;
				}
			}
		}
		return ret;
	}

	/**
     * @param {string} subscriber Module name
     * @param {string} channel Event name
     */
	permissions.validate = function(subscriber, channel){
/* 		console.log('validate', arguments); */
		var test = permissions.rules[channel][subscriber];
		return test === undefined ? false : test;
	};
	
	permissions.init = function () {
		var defaultRules = permissions.getDefaultRules();
		permissions.rules = m.util.extend(permissions.rules, defaultRules);
		console.log('rules', permissions.rules);
	};
	
	permissions.init();
	return permissions
});