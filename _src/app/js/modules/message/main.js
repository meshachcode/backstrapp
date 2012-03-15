/*
	Message Module
*/

define(['lib/backstrapp/module'], function (ModuleClass) {

	var MessageModule = ModuleClass.extend({
		view: 'html/modules/dev/parts/msg.html',
		animation: {
			time: 250
		}
	});

	return {
		instance: new MessageModule(),
		init: function (item, params) {
			return this.instance._init(item, params);
		},
		restore: function (item, params) {
			return this.instance.restore(item, params);
		}
	}
});