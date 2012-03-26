/*
	Backstrapp Mediator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is the application core. It's private, and should drive the application-wide functionality.
	TODO: refactor the Mediator object with pub/priv in mind. THINK TDD!!!
*/
define(['core/collections/modules.collection', 'jsonLoad!json/config.json', 'jquery', 'util', 'template'], 

function (ModulesCollection, config, $, _, template) {

	var _private = {
		util: _,

		modules: new ModulesCollection(),
		channels: {},

		subscribeMode: true,
		publishMode: true,

		config: function () {
			return config || {};
		},

		getConfigObj: function (obj, key, val, callback) {
			var ret = false, haystack = _private.config[obj];
			_.each(haystack, function (i) {
				if (i[key] == val) {
					ret = i;
				}
			});
			callback(ret);
		},

		// TODO: Maybe this is where I can catch errors?
		// if all modules use facade.require, then all errors will be caught in the same place...?
		// consider this solution: https://gist.github.com/1599546
		require: function (source, callback, plugin) {
			var p = '';
			if (plugin) { p = plugin + '!' }
			require([p + source], callback);
		},
		
		restoreModule: function (request, callback) {
			console.log('--- Returning ' + request.name + ' Instance', _private.modules[request.name]);
			if (typeof _private.modules[request.name].restore == 'function') {
				_private.modules[request.name].restore(request);
			} else {
				_private.modules[request.name].init(request);
			}
			if (typeof callback == 'function') {
				callback(_private.modules[request.name]);
			}
		},
		
		registerModule: function (model, collection, callback) {
/* 			console.log('register module', arguments); */
			callback(model.attributes, collection);
		},
	
/* 		TODO: check for an error, and don't try to init if the module doesn't load */
		loadModule: function (request, callback) {
			console.log('--- Loading New ' + request.name, _private.modules);
			_private.modules.bind('add', _private.registerModule);
			require([request.mod], function (m) {
				if (!m.error) {
					_private.modules.add(m, callback);
				} else {
					ret = m;
					callback(m);
				}
			});
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
			console.log('Mediator.publish', arguments, _private.channels);
			if (!_private.channels[channel]) return {error: 'No Subscribers for this event', ch: channel};
			var args = [].slice.call(arguments, 1);
			for (var i = 0, l = _private.channels[channel].length; i < l; i++) {
				_private.channels[channel][i].apply(this, args);
			}
			return {success: 'published event', ch: channel};
		},

		/* TODO: maybe this should just be a facade method to the module factory? */
		getModule: function (request, callback) {
			if (_private.modules[request.name]) {
				_private.restoreModule(request, callback);
			} else {
				_private.loadModule(request, callback);
			}
		},

		processTemplate: template.process,

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