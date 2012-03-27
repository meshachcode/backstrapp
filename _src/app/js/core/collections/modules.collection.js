/*
	* Modules Collection
*/
define(['backbone', 'util', 'backstrapp/models/module.instance.0.1'], function (Backbone, util, ModuleInstance) {

	var ModulesCollection = Backbone.Collection.extend({
		model: ModuleInstance,

		messages: {
			error: {
				moduleLoad: 'ERROR: Module either does not exist or cannot be loaded',
				badRequest: 'ERROR: Invalid Module Request'
			},
			success: {
				moduleLoad: 'SUCCESS: Module was found and loaded, and may now be rendered',
			},
			promise: {
				moduleLoad: 'PROMISE: Something went wrong. Restarting the Module. Stay tuned...'
			}
		},

		initialize: function () {
			util.bindAll(this, 'moduleLoaded', 'updateModuleInstance');
			this.bind('reset', this.addModules, this);
		},
		
		addModules: function (collection) {
			console.log('addModule', collection);
			var mods = collection.toJSON();
			for (var i in mods) {
				this.loadModule(mods[i].path, this.updateModuleInstance);
			}
		},
		
		updateModuleInstance: function (m) {
			m.set({instance: m.init()});
/* 			console.log('update', m); */
		},

		/*
			* @method buildReturnObject
			* construct return object for all module requests
		*/
		buildReturnObject: function (statusStr, messageType, requestObj) {
			var ret = {
				request: requestObj,
				module: requestObj.mod
			};
			ret[statusStr] = this.messages[statusStr][messageType];
			return ret;
		},

		loadModule: function (modulePath, callback) {
			console.log('loadModule', arguments);
			require([modulePath], callback);
		},

		moduleLoaded: function (mod) {
			this.trigger('moduleLoaded', mod);
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
			* @logic
		*/
		getModule: function (request, callback) {
			if (!request || !callback || typeof request != 'object' || typeof callback != 'function') {
				return this.buildReturnObject('error', 'badRequest', request);
			}
			var ret = {};
			// this is weak, but until I get a solid solution for querying a collection, it's the best I got
			var mBN = this.getModuleByName(request.name);
			if (mBN && mBN.get('path') == request.path) {
				ret = this.buildReturnObject('success', 'moduleLoad', request);
			} else {
				ret = this.buildReturnObject('error', 'moduleLoad', request);
			}
			if (typeof callback == 'function') {
				callback(ret);
			}
			/*
				- check the collection for the existence of a module 
				with the {model.name: request.name, && model.path: request.mod}
					- if it does not exist, try to load it
						- subscribe to errorModulePath event for the requested module
							(because try/catch doesn't work with require.js)
							- callback: errorLoadingModule(request, callback, context)
							- context: this
					- if it exists, validate it's state
						- if isValid,
							- callback with success object containing...
								- success: message
								- module: module instance
								- request: request object
						- if !isValid,
							- callback with promise object containing...
								- promise: message
								- request: request object
							- try to init the module with the request obj
								- if module returns error object
									- destroy it, and callback with an error
								- if the module returns success object
									- callback with success object
			*/
		}
		
	});
	
	return ModulesCollection;
});