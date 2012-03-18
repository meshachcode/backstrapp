/*
	Test Module
*/

define(['lib/backstrapp/module.0.2'], function (ModuleClass) {

	var SimpleModule = ModuleClass.extend({
		view: 'html/modules/dev/parts/msg.html',
		animation: {
			time: 1000
		}
	});

	return {
		instance: {},
		init: function (request) {
			console.log('testModule init', request);
			this.instance = new SimpleModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	}
});