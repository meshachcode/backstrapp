/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
*/

define(["./mediator" , "./permissions" ], function (mediator, permissions) {

	var facade = facade || {};
	permissions.init();	

	facade.subscribe = function(subscriber, channel, callback){
/* 		console.log('subscribe', arguments); */
		if(permissions.validate('subscribe', subscriber, channel)){
			mediator.subscribe( channel, callback, this );
		}
	}

	facade.publish = function(subscriber, channel, params){
/* 		console.log('publish', arguments); */
		if(permissions.validate('publish', subscriber, channel)){
			mediator.publish( channel, params );
		}
	}
	
	facade.subscribeNew = function(request){
		request.request = 'subscribe';
		var result = {}, channel = request.event + mediator.util.camelize(request.state);
		if( result = permissions.validate( request ).isValid ){
			mediator.subscribe( channel, request.callback );
		} else {
			console.warn('facade.subscribe validation failed', result, request);
		}
	}

	facade.publishNew = function(request){
		request.request = 'publish';
		var result = {}, channel = request.event + mediator.util.camelize(request.state);
		if( result = permissions.validate( request ).isValid ){
			mediator.publish( channel );
		} else {
			console.warn('facade.publish validation failed', result, request);
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
	
	facade.getModule = function (request, callback) {
		if (mediator.modules[request.name]) {
			mediator.restoreModule(request, callback);
		} else {
			mediator.loadModule(request, callback);
		}
	}

	facade.util = mediator.util;

	return facade;

});