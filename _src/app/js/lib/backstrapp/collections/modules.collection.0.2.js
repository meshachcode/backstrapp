/*
	* Modules Collection
	* USING JQUERY DEFERRED
	TODO: write the template object to handle loading and caching of templates with jq deferred and handlebars
*/

define(['backbone', 'marionette'], function (Backbone) {
	console.log('Backbone', Backbone.Marionette);
	return;

	
	var ModulesCollection = Backbone.Collection.extend({
/*
		eventually, this object should look like:
			moduleCache: {
				pathToModuleA: {
					loaded: true,
					instance: {obj}
				}
			}
*/
		moduleCache: {},

		initialize: function () {
			this.bind('add', this.addModule, this);
		},

		/*
			* @method buildModuleInstanceName
			* @logic
				take a path and name string from a request or module, and create a camelized version
		*/
		buildModuleInstanceName: function (path, name) {
			var p = path.replace(/\//g, '_');
			return name + util.camelize(p);
		},
		
		/*
			* @method loadModule
			* @param request
			* @param callback
		*/
		loadModule: function (request, callback) {
			// jq deferred get.done
		},

		/*
			* @method isModuleLoaded
			* @logic
				check for the existence of a module by the instance name
		*/
		isModuleLoaded: function (instanceName) {
			var test = (this.modules[instanceName] == undefined) ? false : this.modules[instanceName];
			return (test == undefined) ? false : test;
		},
		
		/*
			* @method getModule
			* @param (Object) request
				- name (testModule)
				- mod (module/path/main)
				- el ($(someDiv))
				- arg (name1:value, name2:value2)
			* @param (function) callback
		*/
		getModule: function (request, callback) {
			// make sure all the required params are passed
			if (typeof request != 'object' || typeof callback != 'function') {
				console.error('required params missing');
				return Debug.buildResponseObject('error', 'badRequest', request);
			}
			// use jq deferred to get the module
		}
		
	});

	return ModulesCollection;
});