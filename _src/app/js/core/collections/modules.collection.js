/*
	* Modules Collection
*/
define(['backbone', 'util'], function (Backbone, util) {

	var ModulesCollection = Backbone.Collection.extend({
		messages: {
			error: 'ERROR: Module either does not exist or cannot be loaded',
			success: 'SUCCESS: Module was found and loaded, and may now be rendered',
			promise: 'PROMISE: Something went wrong. Restarting the Module. Stay tuned...'
		},

		initialize: function () {
			util.bindAll(this, 'moduleLoaded');
		},
	
		/*
			* @method buildReturnObject
			* construct return object for all module requests
		*/
		buildReturnObject: function (statusStr, requestObj) {
			var ret = {
				request: requestObj,
				module: requestObj.mod
			};
			ret[statusStr] = this.messages[statusStr];
			return ret;
		},

		loadModule: function (modulePath, callback) {
			require([modulePath], callback);
		},

		moduleLoaded: function (mod) {
			this.trigger('moduleLoaded', mod);
		},
		
		isModuleLoaded: function (query) {
			console.log(this);
			return this.query(query);
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
		getModule: function (request, callback, context) {
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