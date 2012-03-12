/*
	Test Module
*/

define(['lib/backstrapp/module'], function (SimpleModule) {

	return {
		init: function (item, params) {
			return SimpleModule._init(item, params);
		}
	}

});