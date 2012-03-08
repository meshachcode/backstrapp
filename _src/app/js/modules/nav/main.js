/**
	* Nav Module
*/
define(['underscore', 'lib/backstrapp/module', 'core/facade'], function (_, mod, facade) {
	var Module = new mod();

	Module.extend({
		template: 'html/app/parts/nav.html',

		init: function (item, params) {
			_.bindAll(this, 'render', 'processHtml');
			this.base(item, params);
			return this.exports();
		},

		updateActive: function (page) {
			console.log('updateActive', page, this.el);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		},

		render: function () {
			require(['text!' + this.template], this.processHtml);
		},
		
		processHtml: function (markup) {
			facade.subscribe(this.name, 'renderPageModulePage', this.updateActive);
			var obj = {
				meta: facade.getMeta(),
				pages: facade.getPages()
			}
			var el = this.el;
			console.log('el', el);
			facade.processTemplate(markup, obj, function (html) {
				el.html(html);
			});
		}
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});