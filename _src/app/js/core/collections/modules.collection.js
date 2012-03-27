/*
	* Modules Collection
*/
define(['backbone', 'util', 'debug'], function (Backbone, util, Debug) {

	var ModulesCollection = Backbone.Collection.extend({

		initialize: function () {
			util.bindAll(this, 'updateModuleInstances');
			this.bind('reset', this.addModules, this);
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

			// add an instance of the current module
			for (var i in emptyMods) {
				if (emptyMods[i].get('path').indexOf(m.get('path')) != -1) {
					this.getByCid(emptyMods[i].cid).set({instance: m});
				}
			}
		},

		loadModule: function (modulePath, callback) {
			require([modulePath], callback);
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
		*/
		getModule: function (request, callback) {
			// make sure all the required params are passed
			if (!request || !callback || typeof request != 'object' || typeof callback != 'function') {
				return Debug.buildResponseObject('error', 'badRequest', request);
			}
			var ret = {};
			// match both name and path
			// this is weak, but until I get a solid solution for querying a collection, it's the best I got
			var mBN = this.getModuleByName(request.name);
			if (mBN && mBN.get('path') == request.path) {
				ret = Debug.buildResponseObject('success', 'moduleLoad', request);
			} else {
				ret = Debug.buildResponseObject('error', 'moduleLoad', request);
			}
			if (typeof callback == 'function') {
				callback(ret);
			}
		}
		
	});

	return ModulesCollection;
});