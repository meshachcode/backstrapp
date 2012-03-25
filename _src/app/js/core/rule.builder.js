/** 
	* Backstrapp RuleBuilder.
*/
define(['jsonLoad!./permissions.config.json'], 

function (config) {

	var ruleBuilder = {
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
			var ret = ruleBuilder.concatArrays(arr1, arr2);
			ret = ruleBuilder.camelizeArray(ret, lowerFirst);
			return ret;
		},

		buildRule: function (event, requests) {
			var ret = {};
			ret[event] = {};
			for (var i in requests) {
				ret[event][requests[i]] = true;
			}
			return ret;
		},

		initRules: function (rules) {
			var ret;
			if (rules == undefined) {
				ret = false;
			} else {
				var events = ruleBuilder.combineArrays(rules.event, rules.state, true);				
				var moduleEvents = ruleBuilder.combineArrays(rules.module, events, true);
				for (var i in moduleEvents) {
					for (var j in rules.module) {
						if (moduleEvents[i].indexOf(rules.module[j]) != -1) {
							context.add(ruleBuilder.buildRule(moduleEvents[i], rules.request));
						}
					}
				}
				callback(ruleBuilder.rules);
			}
		}
	}

	return function (callbackl) {
		ruleBuilder.initRules(config.defaults, callback);
	}

});