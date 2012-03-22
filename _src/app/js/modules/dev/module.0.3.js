/*
	* Test Module 0.3
	* (instance)
	* single-use module configuration
*/

define(['backstrapp/modules/module.0.3'], function (Module) {
	
	var mod = Module.extend({});
	
	return function (config) {
		return new mod(config);
	}

});