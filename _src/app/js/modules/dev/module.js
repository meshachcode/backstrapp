define(['lib/backstrapp/module'], function (ModuleClass) {

	var SimpleModule = ModuleClass.extend({});

	return {
		init: function (item, params) {
			return SimpleModule._init(item, params);
		}
	}
});