/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.
*/

define(['jsonLoad!json/config.json', 'jquery', 'underscore', 'handlebars'], function (config, $, _, handlebars) {

	var channels = {};
	var obj = {};

	obj.config = config || {};

	obj.template = handlebars;
	
	obj.getConfigObj = function (obj, key, val) {
		console.log('getConfigObj', config, arguments);
		var ret = false, haystack = config[obj];
		_.each(haystack, function (i) {
			if (i[key] == val) {
				ret = i;
			}
		});
		return ret;
	}

	obj.subscribe = function (channel, callback, context) {
        channels[channel] = (!channels[channel]) ? [] : channels[channel];
        channels[channel].push(this.util.method(callback, context));
	};

	obj.publish = function (channel) {
/* 		console.log('mediator publish', arguments); */
		if (!channels[channel]) return;
		var args = [].slice.call(arguments, 1);
		for (var i = 0, l = channels[channel].length; i < l; i++) {
			channels[channel][i].apply(this, args);
		}
	};

	obj.require = function (plugin, source, callback) {
		var p = '';
		if (plugin) { p = plugin + '!' }
		require([p + source], callback);
	};

    obj.util = {
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
            return camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
        },

        /**
         * @link <a href="https://gist.github.com/827679">camelize.js</a>
         * @param {string} str String to make camelCase
         */
        camelize: function (str) {
            return str.replace (/(?:^|[-_])(\w)/g, function (delimiter, c) {
                return c ? c.toUpperCase () : '';
            });
        },

        /**
         * Always returns the fn within the context
         * @param {object} fn Method to call
         * @param {object} context Context in which to call method
         * @returns {object} Fn with the correct context
         */
        method: function (fn, context) {
            return $.proxy(fn, context);
        },

        parseJson: function (json) {
            return $.parseJSON(json);
        },
        
        processTemplate: function (source, context, callback) {
			var template = obj.template.compile(source);
			var html = template(context);
			callback(html);
        }
    };

	return obj;
});