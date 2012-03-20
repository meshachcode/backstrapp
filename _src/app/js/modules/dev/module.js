/*
	Test Module
*/

define(['backstrapp/modules/module.0.2', './msgs.collection'], function (Module, MsgsCollection) {

	var SimpleModule = Module.extend({
		view: 'html/modules/dev/parts/msg.html',
		animation: {
			time: 1000
		}
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