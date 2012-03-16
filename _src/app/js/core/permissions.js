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
			'testModule',
			'testModuleA',
			'testModuleB',
			'testModuleC',
			'testModuleD'
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
		state: [
			'complete', 
			'ready' 
		],
		request: [
			'publish', 
			'subscribe'
		]
	};

	permissions.rules = {
		pageModuleRenderComplete: {
			navModule: {
				subscribe:true
			}
		}
	};

	permissions.newRule = function (channel, rule) {
		var ret = false;
		if (typeof rule == 'object' && typeof channel == 'string') {
			permissions.rules[channel] = rule;
			ret = permissions.rules[channel];
		}
		console.log('newRule', ret);
		return ret;
	};
	
	permissions.concatArrays = function (arr1, arr2, delim) {
		var ret = [];
		delim = (delim === undefined) ? "_" : delim;
		for (var i in arr1) {
			for (var j in arr2) {
				ret.push(arr1[i] + delim + arr2[j]);
			}
		}
		return ret;
	};

	permissions.camelizeArray = function (arr) {
		var ret = [];
		for (var i in arr) {
			ret.push(m.util.camelize(arr[i]));
		}
		return (ret == []) ? false : ret;
	};

	/*
		* @method permissions.newRules
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
					module[rules.module[i]] = {};
					for (var l in rules.request) {
						module[rules.module[i]][rules.request[l]] = true;
					}
					ret[rule] = module;
					if (permissions.rules[rule]) {
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
		if (permissions.rules[channel] && permissions.rules[channel][subscriber]) {
			var test = permissions.rules[channel][subscriber][request];
		}
		return test === undefined ? false : test;
	};

	permissions.initRules = function () {
		var ret = false, rules = permissions.newRules(permissions.defaultRules);
		if (m.util.extend(permissions.rules, rules)) {
			ret = permissions.rules;
		}
		return ret;
	};
	
	permissions.init = function () {
		return permissions.initRules();
	};

	return permissions
});