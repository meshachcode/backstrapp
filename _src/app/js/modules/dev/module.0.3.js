/*
	Test Module
*/

define(['backstrapp/modules/module.0.3'], function (Module) {

	var SimpleModule = Module.extend({
		html: 'hello world'
	});

	return {
		instance: {},
		init: function (request) {
			this.instance = new SimpleModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	}

});