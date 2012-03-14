/*
	Test Module
*/

define(['lib/backstrapp/module'], function (ModuleClass) {
	console.log('creating new ModuleClass()');
	var SimpleModule = new ModuleClass({debug: { publish: true, subscribe: true, render: true }});

	return {
		init: function (item, params) {
			return SimpleModule._init(item, params);
		},
		restore: function (item, params) {
			console.log('restore called on test module', item, params);
			return SimpleModule.restore(item, params);
		}
	}

});