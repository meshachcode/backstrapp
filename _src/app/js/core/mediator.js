/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.
*/

define(['underscore'], function (_) {

	var channels = {};
	var obj = {};

	obj.subscribe = function (channel, subscription) {
		if (!channels[channel]) channels[channel] = [];
		channels[channel].push(subscription);
	};

	obj.publish = function (channel) {
		if (!channels[channel]) return;
		var args = [].slice.call(arguments, 1);
		for (var i = 0, l = channels[channel].length; i < l; i++) {
			channels[channel][i].apply(this, args);
		}
	};

    obj.util = {
        each: _.each,

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
        }
    };

	return obj;
});