/*
	Test Module
*/

define(['lib/backstrapp/module'], function (ModuleClass) {
	var SimpleModule = ModuleClass.extend({
		view: 'html/modules/dev/parts/msg.html'
	});

	return {
		instance: new SimpleModule(),
		init: function (item, params) {
			return this.instance._init(item, params);
		},
		restore: function (item, params) {
			return this.instance.restore(item, params);
		}
	}
});