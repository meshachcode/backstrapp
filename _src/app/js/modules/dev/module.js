/*
	Dev Module
*/
define(['lib/backstrapp/module'], function (SimpleModule) {

	var Module = new SimpleModule();

	return {
		init: function (item, params) {
			return Module._init(item, params);
		}
	}
});