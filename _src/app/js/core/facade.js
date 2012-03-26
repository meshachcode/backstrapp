/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
	
	TODO: refactor the facade object with pub/priv in mind. THINK TDD!!!
*/

define(['./mediator' , './permissions', 'core/collections/modules.collection' ], function (M, Permissions, ModulesCollection) {

	var Mediator = new M();

	var Facade = {
		modules: new ModulesCollection(),

		/* TODO: maybe this should just be a facade method to the module factory? */
		getModule: function (request) {
			if (Facade.modules[request.name]) {
				Mediator.restoreModule(request, function (mod) {
					var i = mod.restore(request);
					Facade.modules.add(i);
				});
			} else {
				Mediator.loadModule(request, function (mod) {
					var i = mod.init(request);
					Facade.modules.add(i);
				});
			}
		},

		subscribe: function(subscriber, channel, callback, context){
			if (!Mediator.get('subscribeMode')) { return {error: 'Subscribe Mode is off'} };
			console.log('subscribe', arguments);
			var me = Facade.modules[context];
			if(Permissions.validate('subscribe', subscriber, channel)){
				var sub = Mediator.subscribe( channel, callback/* , me  */);
				sub.s = subscriber;
				return sub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},
	
		publish: function(subscriber, channel, params){
			if (!Mediator.get('publishMode')) { return {error: 'Publish Mode is Off!'} };
			if(Permissions.validate('publish', subscriber, channel)){
				console.log('channel', channel, subscriber);
				var pub = Mediator.publish(channel, params);
				console.log('pub', pub);
				pub.s = subscriber;
				return pub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},

		get: function (str) {
			return Mediator.get(str);
		},
		
		set: function (obj) {
			return Mediator.set(obj);
		},

		require: Mediator.require,
		processTemplate: Mediator.processTemplate

	};

	return function () {
		var f = Facade;
		return f;
	};

});