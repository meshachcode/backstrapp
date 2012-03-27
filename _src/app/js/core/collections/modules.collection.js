/*
	* Modules Collection
*/
define(['backbone', 'util', 'debug', 'core/facade'], function (Backbone, util, Debug, Facade) {

	var ModulesCollection = Backbone.Collection.extend({
		moduleQueue: {},

		initialize: function () {
			util.bindAll(this, 'updateModuleInstances', 'handleSuccesses');
			this.bind('reset', this.addModules, this);
/* 			this.bind('add', this.updateModuleInstances, this); */
		},

		addModules: function (collection) {
			var mods = collection.toJSON();
			for (var i in mods) {
				this.loadModule(mods[i].path, this.updateModuleInstances);
			}
		},

		updateModuleInstances: function (m) {
			// find all models without a module instance
			var emptyMods = this.filter(function (mod) {
				return mod.get('instance') == undefined;
			});

			// add an instance of the current module to any with a matching path (moduletype)
			for (var i in emptyMods) {
				if (emptyMods[i].get('path') && emptyMods[i].get('path').indexOf(m.get('path')) != -1) {
					this.getByCid(emptyMods[i].cid).set({instance: m});
				}
			}
		},

		loadModule: function (request, callback) {
			var me = this;
			require([request.path], function (m) {
				var i = request;
				i.instance = m;
				if (typeof callback == 'function') {
					callback(i);
				}
			});
		},
	
		getModuleByName: function (name) {
			return this.find(function (m) {
				var mod = m.toJSON();
				return mod.name == name;
			});
		},

		getModuleByPath: function (path) {
			return this.find(function (m) {
				var mod = m.toJSON();
				return mod.path == path;
			});
		},
		
			// match both name and path
			// this is weak, but until I get a solid solution for querying a collection, it's the best I got
		isModuleLoaded: function (request) {
			var mBN = this.getModuleByName(request.name);
			return (mBN && mBN.get('path') == request.path);
		},
		
		handleErrors: function (request, callback) {
			console.log('handleErrors', arguments);
			callback(Debug.buildResponseObject('error', 'moduleLoad', request));
		},
		
		handleSuccesses: function (module, request, callback) {
/* 			this.add(module); */
			console.log('handleSuccess', arguments, this.toJSON(), this.moduleQueue);
			// TODO: build a module loading QUEUE, so the modules can be automatically added 
			// to the queue upon request, then when they're loaded, a listener to on.add
			// fires, and grabs all of the instance info to add to the module in the collection
			var m = this.buildQueueString(module.path, module.name);
			if (this.moduleQueue[m]) {
				var response = Debug.buildResponseObject('success', 'moduleLoad', this.moduleQueue[m]);
				console.log('module', response, m, module);
				callback(response);
			}
		},
		
		buildQueueString: function (path, name) {
			var p = path.replace(/\//g, '_');
			var str = name + util.camelize(p);
			return str;
		},

		addRequestToQueue: function (request) {
			var str = this.buildQueueString(request.path, request.name);
			this.moduleQueue[str] = request;
			return this.moduleQueue;
		},
		
		/*
			* @method getModule
			* @param (Object) request
				- name (testModule)
				- mod (module/path/main)
				- el ($(someDiv))
				- arg (name1:value, name2:value2)
			* @param (function) callback
			* @param (function) context
			* @callback
				- success: the module was found or loaded, and may now be rendered
				- error: the module either doesn't exist, or can't be validated
				- promise: something was wrong, I'm trying to fix it, when I know, I'll get back
		*/
		getModule: function (request, callback) {
			// make sure all the required params are passed
			if (!request || !callback || typeof request != 'object' || typeof callback != 'function') {
				console.error('required params missing');
				return Debug.buildResponseObject('error', 'badRequest', request);
			}
			if (mod = this.isModuleLoaded(request)) {
				this.handleSuccesses(mod, request, callback);
			} else {
				var q = this.addRequestToQueue(request), me = this;
				console.log('q', q);
				Facade.subscribe('errorHandler', 'errorModulePath', this.handleErrors);
				// try to load the module, and callback with the response
				this.loadModule(request, function (mod) {
					me.handleSuccesses(mod, request, callback);
				});
			}
		}
		
	});

	return ModulesCollection;
});