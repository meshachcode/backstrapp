/**
	* Nav Module
*/
define(['json!data/config.json', 'underscore', 'lib/backstrapp/module'], function (config, _, mod) {
	var Module = new mod();

	Module.extend({
		template: 'html/test/content/nav.html',

		init: function (item, params) {
			_.bindAll(this, 'render');
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(params);
			return this.exports();
		},

		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', el).removeClass('active');
			$('#nav_' + page, el).addClass('active');
		},

		render: function () {
			var el = this.el;
			require(['text!' + this.template], function (response) {
				el.html(response);
			});
		}
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});