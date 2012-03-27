/*
	* Modules Collection
*/
define(['backbone', 'util', 'debug', 'backstrapp/core/facade'], function (Backbone, util, Debug, Facade) {

	var ModulesCollection = Backbone.Collection.extend({
		/*
			* @property modules
				- instead of storing the module instances in the collection, 
				- set a modules{} object,
			* @example
				modules: {
					testModuleAJquibsMessage: messageModuleInstance
				}
			* @logic
				- this will ensure that each instance is unique to the module path and div id.
					- that way, if you want the same instance, just use the same module path and div id
					- if you want a new instance of the module, use a new div ID
					- if you put a new module into a previously-used divID, it will create a new instance.
		*/
		modules: {},

		initialize: function () {
			util.bindAll(this, 'moduleLoaded');
			this.bind('reset', this.addModules, this);
		},
		
		initComplete: function () {
			console.log('initComplete');
			Facade.publish('ModulesCollectionInitComplete', this.toJSON());
		},
		
		/*
			* @method moduleLoaded
			* @logic
				loads the instancename and module result into the modules object
				if there are no more models to load, fire initComplete
		*/
		moduleLoaded: function (result) {
			this.modules[result.request.instanceName] = {};
			this.modules[result.request.instanceName] = result;
			if (util.keys(this.modules).length == this.models.length) {
				this.initComplete();
			}
		},

		/*
			* @method buildModuleInstanceName
			* @logic
				take a path and name string from a request or module, and create a camelized version
		*/
		buildModuleInstanceName: function (path, name) {
			var p = path.replace(/\//g, '_');
			var str = name + util.camelize(p);
			return str;
		},
		
		addModules: function (collection) {
			var me = this;
			this.each(function (m) {
				var request = m.toJSON();
				me.getModule(request, me.moduleLoaded);
			});
		},

		/*
			* @method loadModule
			* @param request
			* @param callback
			* @logic
				- try 
					(subscribe to the error event?)
					require the module
				- catch
					callback an error object
				- finally
					callback a success object containing the instance
		*/
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

		/*
			* @method isModuleLoaded
			* @logic
				check for the existence of a module by the instance name
		*/
		isModuleLoaded: function (instanceName) {
			return (this.modules[instanceName] == undefined) ? false : this.modules[instanceName];
		},
		
		handleErrors: function (request, callback) {
			var response = Debug.buildResponseObject('error', 'moduleLoad', request);
			callback(response);
		},
		
		handleSuccesses: function (request, callback) {
			var response = Debug.buildResponseObject('success', 'moduleLoad', request);
			callback(response);
		},
		
		/*
			* @method getModule
			* @param (Object) request
				- name (testModule)
				- mod (module/path/main)
				- el ($(someDiv))
				- arg (name1:value, name2:value2)
			* @param (function) callback
			* @callback
				- success: the module was found or loaded, and may now be rendered
				- error: the module either doesn't exist, or can't be validated
				- promise: something was wrong, I'm trying to fix it, when I know, I'll get back
			* @logic
				- builds moduleName (see above)
				- checks for modules[moduleName]
					- if found, callback a success object containing the instance
					- if not found, loadModule(request, callback with success object);
		*/
		getModule: function (request, callback) {
			// make sure all the required params are passed
			if (!request || !callback || typeof request != 'object' || typeof callback != 'function') {
				console.error('required params missing');
				return Debug.buildResponseObject('error', 'badRequest', request);
			}
			var mod, instanceName = this.buildModuleInstanceName(request.path, request.name);
			request.instanceName = instanceName;
			if (mod = this.isModuleLoaded(instanceName)) {
				var response = Debug.buildResponseObject('success', 'moduleLoad', mod);
				callback(response);
			} else {
				this.loadModule(request, function (mod) {
					var response = Debug.buildResponseObject('success', 'moduleLoad', mod);
					callback(response);
				});
			}
		}
		
	});

	return ModulesCollection;
});