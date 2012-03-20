/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
*/

define(["./mediator" , "./permissions" ], function (mediator, permissions) {

	var facade = facade || {};
	facade.modules = {};
	permissions.init();	

	facade.subscribe = function(subscriber, channel, callback, context){
/* 		console.log('subscribe', arguments); */
		var me = facade.modules[context];
		if(permissions.validate('subscribe', subscriber, channel)){
			mediator.subscribe( channel, callback, me );
		}
	}

	facade.publish = function(subscriber, channel, params){
/* 		console.log('publish', arguments); */
		if(permissions.validate('publish', subscriber, channel)){
			mediator.publish( channel, params );
		}
	}
	
	facade.require = function(plugin, source, callback) {
		mediator.require(plugin, source, callback);
	}

	facade.processTemplate = function (html, data, callback) {
		mediator.util.processTemplate(html, data, callback);
	}
	
	facade.getMeta = function () {
		return mediator.config.meta;
	}

	facade.getPages = function () {
		return mediator.config.pages;
	}
	
	facade.getPage = function (page, callback) {
		mediator.getConfigObj('pages', 'id', page, callback);
	}
	
	facade.restoreModule = function (request, callback) {
		console.log('--- Returning ' + request.name + ' Instance', facade.modules[request.name]);
		if (typeof facade.modules[request.name].restore == 'function') {
			facade.modules[request.name].restore(request);
		} else {
			facade.modules[request.name].init(request);
		}
		if (typeof callback == 'function') {
			callback(facade.modules[request.name]);
		}
	}

	facade.loadModule = function (request, callback) {
		console.log('--- Loading New ' + request.name, facade.modules);
		var mod = require([request.mod], function (m) {
			facade.modules[request.name] = m;
			facade.modules[request.name].init(request);
			if (typeof callback == 'function') {
				callback(facade.modules[request.name]);
			}
		});
	}
	
	facade.getModule = function (request, callback) {
		if (facade.modules[request.name]) {
			facade.restoreModule(request, callback);
		} else {
			facade.loadModule(request, callback);
		}
	}

	facade.util = mediator.util;

	return facade

});