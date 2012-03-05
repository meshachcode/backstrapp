define(['lib/backstrapp/module'], function (mod) {

	var m = mod.extend({});
	
/*
	m.init = function (params) {
		console.log('hi', params);
		mod.init(params);
	}
*/

	return {
		init: function (item, params) {
			var n = $(item).attr('id'), ex = {};
			m.name = n;
			m.el = item;
			m.init(params);
			ex = m.get('exports');
			return ex;
		}
	};
});