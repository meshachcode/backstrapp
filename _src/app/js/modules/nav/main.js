/**
	* Nav Module
*/
define(['jsonLoad!json/config.json', 'underscore', 'lib/backstrapp/module', 'core/facade'], function (config, _, mod, facade) {
	var Module = new mod();

	Module.extend({
		template: 'html/app/parts/nav.html',

		init: function (item, params) {
			_.bindAll(this, 'render');
			this.base(item, params);
			facade.subscribe(this.name, 'renderPageModulePage', this.updateActive);
			return this.exports();
		},

		updateActive: function (page) {
			console.log('updateActive', page, this.el);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
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