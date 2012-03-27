/* 
	Backstrapp Facade.
	Drawn on heavily from Addy Osmani's 'Aura' code.
	This is your sandbox. All modules will know about this module, so keep it clean, and secure. 

	* TODO: Restore the facade!!!
	* the facade doesn't need to be so complex. 
	* It's simply a way to communicate with the mediator.
	* Remove all of the module-loading logic, and return to a simple, pub/sub and permissions management (duh!)
*/

define(['./mediator' , './permissions', 'core/collections/modules.collection' ], 

function (M, Permissions, ModulesCollection) {

	var Facade = function () {
		var Mediator = new M();
		
		modules = new ModulesCollection();

		getModule = function (request) {
			console.log('arbitraryVariable', Mediator.arbitraryVariable);
			if (this.modules.length >= 1 && this.isModuleLoaded(request.name)) {
				console.log('restoring module');
				Mediator.restoreModule(request, function (mod) {
					var i = mod.restore(request);
					Facade.modules.add(i);
				});
			} else {
				console.log('loading Module');
				Mediator.loadModule(request, function (mod) {
					var i = mod.init(request);
					Facade.modules.add(i);
				});
			}
		};
		
		isModuleLoaded = function (name) {
			this.modules.find(function (m) {
				return (m.get('name') == name) ? m : false;
			});
		};

		subscribe = function(subscriber, channel, callback, context){
			if (!Mediator.get('subscribeMode')) { return {error: 'Subscribe Mode is off'} };
			console.log('subscribe', arguments);
			var me = Facade.modules[context];
			if(Permissions.validate('subscribe', subscriber, channel)){
				var sub = Mediator.subscribe( channel, callback, me );
				sub.s = subscriber;
				return sub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		};
	
		publish = function(subscriber, channel, params){
			if (!Mediator.get('publishMode')) { return {error: 'Publish Mode is Off!'} };
			console.log('publishing!!!', arguments);
			if(Permissions.validate('publish', subscriber, channel)){
				console.log('channel', channel, subscriber);
				var pub = Mediator.publish(channel, params);
				console.log('pub', pub);
				pub.s = subscriber;
				return pub;
			} else {
				return {error: 'Permission Failed', s: subscriber, ch: channel};
			}
		};

		processTemplate = Mediator.processTemplate;
		
		return {
			publish: function (sub, ch, p) {
				return Facade.publish(sub, ch, p);
			},

			subscribe: function (sub, ch, cb, co) {
				return Facade.subscribe(sub, ch, ch, co);
			},

			get: function (str) {
				return Mediator.get(str);
			},

			set: function (obj) {
				return Mediator.set(obj);
			}
		}
	};

	return function () {
		return new Facade();
	};

});