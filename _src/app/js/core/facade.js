/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 

	* TODO: Restore the facade!!!
	* the facade doesn't need to be so complex. 
	* It's simply a way to communicate with the mediator.
	* Remove all of the module-loading logic, and return to a simple, pub/sub and permissions management (duh!)
*/

define(['./mediator' , './permissions'], 

function (M, Permissions) {

	var Facade = {
		Mediator: new M(),

		subscribe: function(subscriber, channel, callback, context){
			if (!this.Mediator.get('subscribeMode')) { return {error: 'Subscribe Mode is off'} };
			if(Permissions.validate('subscribe', subscriber, channel)){
				var sub = this.Mediator.subscribe( channel, callback );
				sub.s = subscriber;
				return sub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},
	
		publish: function(subscriber, channel, params){
			if (!this.Mediator.get('publishMode')) { return {error: 'Publish Mode is Off!'} };
			if(Permissions.validate('publish', subscriber, channel)){
				var pub = this.Mediator.publish(channel, params);
				pub.s = subscriber;
				return pub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		},

		processTemplate: function () {
			var args = arguments.split(',');
			return this.Mediator.processTemplate(args);
		},

		get: function (str) {
			return this.Mediator.get(str);
		},

		set: function (obj) {
			return this.Mediator.set(obj);
		}
	};

	return Facade;

});