/*
	* Test Module 0.3
	* (instance)
	* single-use module configuration (properties only!)
*/

define(['backstrapp/modules/module.0.3'], function (Module) {

	return function (config) {
		return new Module(config);
	};

});