/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
	
	TODO: refactor the facade object with pub/priv in mind. THINK TDD!!!
*/

define(["./mediator" , "./permissions" ], function (Mediator, permissions) {

	var _private = {
		modules: {},

		require: function(plugin, source, callback) {
			Mediator.require(plugin, source, callback);
		},
	
		processTemplate: function (html, data, callback) {
			Mediator.util.processTemplate(html, data, callback);
		},
		
		getMeta: function () {
			return Mediator.config.meta;
		},
	
		getPages: function () {
			return Mediator.config.pages;
		},
		
		getPage: function (page, callback) {
			Mediator.getConfigObj('pages', 'id', page, callback);
		},
		
		restoreModule: function (request, callback) {
			console.log('--- Returning ' + request.name + ' Instance', facade.modules[request.name]);
			if (typeof facade.modules[request.name].restore == 'function') {
				facade.modules[request.name].restore(request);
			} else {
				facade.modules[request.name].init(request);
			}
			if (typeof callback == 'function') {
				callback(facade.modules[request.name]);
			}
		},
	
		loadModule: function (request, callback) {
			console.log('--- Loading New ' + request.name, facade.modules);
			var mod = require([request.mod], function (m) {
				facade.modules[request.name] = m;
				facade.modules[request.name].init(request);
				if (typeof callback == 'function') {
					callback(facade.modules[request.name]);
				}
			})
		}
	};

	var Facade = {
		util: Mediator.util,
		subscribe: function(subscriber, channel, callback, context){
			/* console.log('subscribe', arguments); */
			var me = _private.modules[context];
			if(permissions.validate('subscribe', subscriber, channel)){
				Mediator.subscribe( channel, callback, me );
			}
		},
	
		publish: function(subscriber, channel, params){
			/* console.log('publish', arguments); */
			if(permissions.validate('publish', subscriber, channel)){
				Mediator.publish( channel, params );
			}
		},
		
		getModule: function (request, callback) {
			if (_private.modules[request.name]) {
				_private.restoreModule(request, callback);
			} else {
				_private.loadModule(request, callback);
			}
		}
	};

	return Facade;

});