/*
	* Test Module 0.3
	* (instance)
	* single-use module configuration (properties only!)
*/

define(['backstrapp/modules/module.0.3'], function (Module) {


	return {
		init: function (config) {
			var e = new Module(config);
			return e;
		},
		restore: function (config) {
			return e.restore(config);
		}
	}

});