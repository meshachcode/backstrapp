/*
	Test Module
*/

define(['lib/backstrapp/module'], function (ModuleClass) {

	var SimpleModule = ModuleClass.extend({
		view: 'html/modules/dev/parts/msg.html',
		animation: {
			time: 250
		}
	});

	return {
		instance: {},
		init: function (item, params) {
			this.instance = new SimpleModule({debug:{publish:false,subscribe:false,render:false}});
			return this.instance._init(item, params);
		},
		restore: function (item, params) {
			return this.instance.restore(item, params);
		}
	}
});