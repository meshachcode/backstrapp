/*
	Test Module
*/

define(['lib/backstrapp/module'], function (ModuleClass) {
	console.log('creating new ModuleClass()');
	var SimpleModule = new ModuleClass();

	return {
		init: function (item, params) {
			return SimpleModule._init(item, params);
		},
		restore: function (item, params) {
			return SimpleModule.restore(item, params);
		}
	}

});