/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.
*/

define(['jsonLoad!json/config.json', 'jquery', 'underscore', 'handlebars'], function (config, $, _, handlebars) {

	var channels = {};
	var mediator = {};

	mediator.config = config || {};

	mediator.template = handlebars;
	mediator.modules = {};

	mediator.getConfigObj = function (obj, key, val, callback) {
		var ret = false, haystack = mediator.config[obj];
		_.each(haystack, function (i) {
			if (i[key] == val) {
				ret = i;
			}
		});
		callback(ret);
	}

	mediator.subscribe = function (channel, callback, context) {
/* 		console.log('mediator.subscribe', arguments); */
        channels[channel] = (!channels[channel]) ? [] : channels[channel];
        channels[channel].push(this.util.method(callback, context));
	};

	mediator.publish = function (channel) {
/* 		console.log('mediator.publish', arguments); */
		if (!channels[channel]) return;
		var args = [].slice.call(arguments, 1);
		for (var i = 0, l = channels[channel].length; i < l; i++) {
			channels[channel][i].apply(this, args);
		}
	};

	mediator.require = function (plugin, source, callback) {
		var p = '';
		if (plugin) { p = plugin + '!' }
		require([p + source], callback);
	};

	mediator.restoreModule = function (request, callback) {
		console.log('--- Returning ' + request.name + ' Instance', mediator.modules[request.name]);
		
		if (typeof mediator.modules[request.name].restore == 'function') {
			mediator.modules[request.name].restore(request);
		} else {
			mediator.modules[request.name].init(request);
		}
		if (typeof callback == 'function') {
			callback(mediator.modules[request.name]);
		}
	}

	mediator.loadModule = function (request, callback) {
		console.log('--- Loading New ' + request.name, mediator.modules);
		var mod = require([request.mod], function (m) {
			mediator.modules[request.name] = m;
			mediator.modules[request.name].init(request);
			if (typeof callback == 'function') {
				callback(mediator.modules[request.name]);
			}
		});
	}	

    mediator.util = {
        each: _.each,
        extend: _.extend,
        isFunction: _.isFunction,
        bindAll: _.bindAll,
        isIn: $.inArray,
		has: function(obj, key) {
			return hasOwnProperty.call(obj, key);
		},

        decamelize: function (camelCase, delimiter) {
            delimiter = (delimiter === undefined) ? "_" : delimiter;
            var ret = camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
            if (ret.substr(0, 1) == delimiter) {
            	ret = ret.substr(1);
            }
            return ret;
        },        

        /**
         * @link <a href="https://gist.github.com/827679">camelize.js</a>
         * @param {string} str String to make camelCase
         */
        camelize: function (str, lowerFirst) {
        	lowerFirst = (lowerFirst === undefined) ? false : lowerFirst;
        	var reg = /(?:^|[-_])(\w)/g;
        	if (lowerFirst) {
        		reg = /[-_]([a-z])/ig;
        	}
            return str.replace (reg, function (delimiter, c) {
                return c ? c.toUpperCase () : '';
            });
        },

        /**
         * Always returns the fn within the context
         * @param {mediatorect} fn Method to call
         * @param {mediatorect} context Context in which to call method
         * @returns {mediatorect} Fn with the correct context
         */
        method: function (fn, context) {
            return $.proxy(fn, context);
        },

        parseJson: function (json) {
            return $.parseJSON(json);
        },
        
        processTemplate: function (source, context, callback) {
			var template = mediator.template.compile(source);
			var html = template(context);
			callback(html);
        }
    };

	return mediator;
});