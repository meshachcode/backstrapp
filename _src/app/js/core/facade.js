/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
*/

define(["./mediator" , "./permissions" ], function (mediator, permissions) {

	var facade = facade || {};
	
	facade.modules = {};

	facade.subscribe = function(subscriber, channel, callback){
/* 		console.log('subscribe', arguments); */
		if(permissions.validate(subscriber, channel)){
			mediator.subscribe( channel, callback );
		}
	}

	facade.publish = function(subscriber, channel, params){
/* 		console.log('publish', arguments); */
		if(permissions.validate(subscriber, channel)){
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
	
	facade.getPage = function (page) {
		return mediator.getConfigObj('pages', 'id', page);
	}
	
	facade.registerModule = function (module) {
		console.log('registerModule', module.name, facade.modules);
		if (!facade.modules[module.name]) {
			facade.modules[module.name] = module;
		}
		return facade.modules[module.name];
/*
		for (var i in rules) {
			permissions.setPermission(rules[i], module);
		}
*/
	}

	facade.util = mediator.util;

	return facade;

});