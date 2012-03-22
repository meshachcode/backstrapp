/*
	* Test Module 0.3
	* (instance)
*/

define(['backstrapp/modules/module.facade.0.3'], function (Module) {

	var SimpleModule = Module.extend({});

	return {
		instance: {},
		init: function (request) {
			this.instance = new SimpleModule(request);
			return this.instance;
		},
		restore: function (request) {
			this.instance.restore(request);
			return this.instance;
		}
	}

});