/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application Brain.
*/
define(['jquery', 'util'], 

function ($, _) {

	var _private = {
		util: _,
		channels: {},
		require: function (source, callback, p) {
			p = (p != undefined) ? p + '!' : '' ;
			require([p + source], callback);
		}
	};

	var Mediator = {	
		subscribe: function (channel, callback, context) {
			/* console.log('Mediator.subscribe', channel, context); */
	        _private.channels[channel] = (!_private.channels[channel]) ? [] : _private.channels[channel];
	        _private.channels[channel].push(_private.util.method(callback, context));
	        return {success: 'subscription set', ch: channel};
		},

		publish: function (channel) {
			/* 	console.log('Mediator.publish', arguments, _private.channels); */
			if (!_private.channels[channel]) return {error: 'No Subscribers for this event', ch: channel};
			var args = [].slice.call(arguments, 1);
			for (var i = 0, l = _private.channels[channel].length; i < l; i++) {
				_private.channels[channel][i].apply(this, args);
			}
			return {success: 'published event', ch: channel};
		},

		clear: function () {
			_private[channels] = {};
			return _private[channels];
		},

		get: function (str) {
			return (_private[str] != undefined) ? _private[str] : false;
		},

		set: function (obj) {
			_private.util.extend(_private, obj);
			return obj;
		}
	}

	return function() {
		var m = Mediator;
		return m;
	};

});