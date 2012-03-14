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
			'pageModule',
			'testModule'
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
			'restore',
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

	permissions.rules = {
		pageModuleRenderComplete: {
			navModule: {
				subscribe:true
			}
		}
	};
		
	/*
		* @method permissions.initRules
		* it's ugly, but it works for now. saves hard-coding new modules in batches, 
		* or having to manage multiple permissions files. Instead, this uses the 
		* above permissions.defaultRules object, and assigns each module with permission
		* to pub/sub with themselves. Cross-polinating modules should be hard-coded into 
		* the .rules object to keep things easy to find for now.
	*/
	permissions.newRules = function (rules) {
		var ret = {};
		for (var i in rules.module) {
			for (var j in rules.event) {
				var event = rules.module[i] + m.util.camelize(rules.event[j]);
				for (var k in rules.state) {
					var rule = event + m.util.camelize(rules.state[k]);
					var module = {};
					module[rules.module[i]] = {
						publish: true,
						subscribe: true
					};
					ret[rule] = module;
					if (permissions.rules[rule]) {
/* 						console.log('###', rule, permissions.rules[rule]); */
						m.util.extend(ret[rule], permissions.rules[rule]);
					}
				}
			}
		}
		return ret;
	}

	/**
     * @param {string} subscriber Module name
     * @param {string} channel Event name
     */
	permissions.validate = function(request, subscriber, channel){
/* 		console.log('validate', arguments, permissions.rules); */
		var test = permissions.rules[channel][subscriber][request];
		return test === undefined ? false : test;
	};

	permissions.init = function () {
		var rules = permissions.newRules(permissions.defaultRules);
		m.util.extend(permissions.rules, rules);
/* 		console.log('init rules', permissions.rules); */
	};
	
	permissions.init();
	return permissions
});