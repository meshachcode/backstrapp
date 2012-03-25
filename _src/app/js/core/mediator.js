/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.

	TODO: refactor the mediator object with pub/priv in mind. THINK TDD!!!
*/

define(['jsonLoad!json/config.json', 'jquery', 'util', 'template'], function (config, $, _, template) {


	var _private = {
		channels: {},
		config: function () {
			return config || {};
		},
		getConfigObj = function (obj, key, val, callback) {
			var ret = false, haystack = _private.config[obj];
			_.each(haystack, function (i) {
				if (i[key] == val) {
					ret = i;
				}
			});
			callback(ret);
		},
		require = function (source, callback, plugin) {
			var p = '';
			if (plugin) { p = plugin + '!' }
			require([p + source], callback);
		};
	};

	var mediator = {
		subscribe: function (channel, callback, context) {
			/* console.log('mediator.subscribe', channel, context); */
	        _private.channels[channel] = (!_private.channels[channel]) ? [] : _private.channels[channel];
	        _private.channels[channel].push(this.util.method(callback, context));
		},

		publish: function (channel) {
			/*	console.log('mediator.publish', arguments); */
			if (!_private.channels[channel]) return;
			var args = [].slice.call(arguments, 1);
			for (var i = 0, l = _private.channels[channel].length; i < l; i++) {
				_private.channels[channel][i].apply(this, args);
			}
		}
	}

	return mediator;

});