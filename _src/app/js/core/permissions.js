/** 
	* Backstrapp Permissions.
	* NOTE: is it possible to load these from an external source? 
	* Maybe this should all be handled at the server-level (eventually).
*/
define(['jquery', './mediator'], function ($, m) {

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
		},
		pageModulePagesLoaded: {
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

	permissions.camelizeArray = function (arr, lowerFirst) {
		var ret = [];
		for (var i in arr) {
			ret.push(m.util.camelize(arr[i], lowerFirst));
		}
		return (ret == []) ? false : ret;
	};
	
	permissions.combineArrays = function (arr1, arr2, lowerFirst) {
		var ret = permissions.concatArrays(arr1, arr2);
		ret = permissions.camelizeArray(ret, lowerFirst);
		return ret;
	};
	
	permissions.newRules = function (rules) {
		var ret = false;
		if (rules != undefined) {
			ret = {};
			var events = permissions.combineArrays(rules.event, rules.state, true);
			var moduleEvents = permissions.combineArrays(rules.module, events, true);
			for (var i in moduleEvents) {
				ret[moduleEvents[i]] = {};
				for (var j in rules.module) {
					if (moduleEvents[i].indexOf(rules.module[j]) != -1) {
						ret[moduleEvents[i]][rules.module[j]] = {};
						for (var k in rules.request) {
							ret[moduleEvents[i]][rules.module[j]][rules.request[k]] = true;
						}
					}
				}
			}
		}
		return ret;
	};

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