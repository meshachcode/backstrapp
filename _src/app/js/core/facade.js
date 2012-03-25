/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 
	
	TODO: refactor the facade object with pub/priv in mind. THINK TDD!!!
*/

define(["./mediator" , "./permissions" ], function (M, permissions) {

	var Mediator = new M();

	var Facade = {
		subscribe: function(subscriber, channel, callback, context){
			if (!Mediator.get('subscribeMode')) { return {error: 'Subscribe Mode is off'} };
			/* console.log('subscribe', arguments); */
/* 			var me = Mediator.modules[context]; */
			if(permissions.validate('subscribe', subscriber, channel)){
				var sub = Mediator.subscribe( channel, callback/* , me  */);
				sub.s = subscriber;
				return sub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},
	
		publish: function(subscriber, channel, params){
			if (!Mediator.get('publishMode')) { return {error: 'Publish Mode is Off!'} };
			/* console.log('publish', arguments); */
			if(permissions.validate('publish', subscriber, channel)){
				var pub = Mediator.publish( channel, params );
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
		getModule: Mediator.getModule,
		processTemplate: Mediator.processTemplate

	};

	return function () {
		var f = Facade;
		return f;
	};

});