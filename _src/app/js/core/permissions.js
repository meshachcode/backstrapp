/** 
	* Backstrapp Permissions.
	* NOTE: is it possible to load these from an external source? 
	* Maybe this should all be handled at the server-level (eventually).

	TODO: refactor the permissions object with pub/priv in mind. THINK TDD!!!
*/
define(['jquery', './mediator'], function ($, m) {

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.
	var _private = {
		defaultRules: {
			module: [
				'navModule',
				'pageModule',
				'testModule',
				'testModuleA',
				'testModuleB',
				'testModuleC',
				'testModuleD',
				'Module3Test'
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
		}, 
		
		rules: {
			pageModuleRenderComplete: {
				navModule: {
					subscribe:true
				}
			},
			pageModulePagesLoaded: {
				navModule: {
					subscribe:true
				},
				pageModule: {
					publish:true
				}
			}
		},		

		newRule: function (channel, rule) {
			var ret = false;
			if (typeof rule == 'object' && typeof channel == 'string') {
				if (_public.rules[channel] != undefined) {
					m.util.extend(_public.rules[channel], rule);
				} else {
					_public.rules[channel] = rule;
				}
				ret = _public.rules[channel];
			}
			return ret;
		},

		concatArrays: function (arr1, arr2, delim) {
			var ret = [];
			delim = (delim === undefined) ? "_" : delim;
			for (var i in arr1) {
				for (var j in arr2) {
					ret.push(arr1[i] + delim + arr2[j]);
				}
			}
			return ret;
		},
	
		camelizeArray: function (arr, lowerFirst) {
			var ret = [];
			for (var i in arr) {
				ret.push(m.util.camelize(arr[i], lowerFirst));
			}
			return (ret == []) ? false : ret;
		},
		
		combineArrays: function (arr1, arr2, lowerFirst) {
			var ret = _public.concatArrays(arr1, arr2);
			ret = _public.camelizeArray(ret, lowerFirst);
			return ret;
		},

		newRules: function (rules, callback) {
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
							permissions.newRule(moduleEvents[i], ret[moduleEvents[i]]);
						}
					}
				}
			}
			callback(permissions.rules);
		},
	
	
		initRules: function () {
			_private.newRules(_private.defaultRules, function (rules) {
				return rules;
			});
		}

	}
	
	var _public = {
		/**
	     * @param {string} subscriber Module name
	     * @param {string} channel Event name
	     */
		validate: function(request, subscriber, channel){
			console.log('validate', _private.rules, arguments);
			if (_private.rules[channel] && _private.rules[channel][subscriber]) {
				var test = _private.rules[channel][subscriber][request];
			} else {
				console.error('Permissions Validate Fail:', _private.rules, request, subscriber, channel);
			}
			return test === undefined ? false : test;
		},
		
		init: function () {
			return _private.initRules();
		}
	}
	
	return _public;

});