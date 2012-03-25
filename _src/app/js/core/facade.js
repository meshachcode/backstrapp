/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
	
	TODO: refactor the facade object with pub/priv in mind. THINK TDD!!!
*/

define(["./mediator" , "./permissions" ], function (Mediator, permissions) {

	var Facade = {
		subscribe: function(subscriber, channel, callback, context){
			if (!Mediator.get('subscribeMode')) { return {error: 'Subscribe Mode is Off!'} };
			/* console.log('subscribe', arguments); */
			var me = Mediator.modules[context];
			if(permissions.validate('subscribe', subscriber, channel)){
				Mediator.subscribe( channel, callback, me );
			}
		},
	
		publish: function(subscriber, channel, params){
			if (!Mediator.get('publishMode')) { return {error: 'Publish Mode is Off!'} };
			/* console.log('publish', arguments); */
			if(permissions.validate('publish', subscriber, channel)){
				Mediator.publish( channel, params );
			}
		},

		getModule: Mediator.getModule,
		
		require: function(plugin, source, callback) {
			Mediator.require(plugin, source, callback);
		},

		processTemplate: function (html, data, callback) {
			Mediator.processTemplate(html, data, callback);
		},

		get: function (str) {
			return Mediator.get(str);
		},
		
		set: function (obj) {
			return Mediator.set(obj);
		}
	};

	return Facade;

});