/**
	* Page Module
*/
define(['json!data/config.json', 'underscore', 'lib/backstrapp/module', './router', './facade'], function (config, _, mod, router, facade) {
	var Module = new mod();

	Module.extend({
		defaultPage: 'home',
		pagesDir: 'html/test/',
		router: {},

		init: function (item, params) {
			_.bindAll(this, 'route', 'subscribe');
			this.router = new router();
			this.router.bind('route:page', this.route);
			this.router.start();
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(params);
			return this.exports();
		},

		route: function (page) {
			if (page === undefined) {
				page = this.defaultPage;
			}
			this.subscribe(page);
			this.getPage(page);
		},

		subscribe: function (page) {
			facade.subscribe(page, 'renderDone', this.render);
		},

		render: function () {
			el.html(html);
		    builder.execute(el);
		    activator.execute(el);
		}
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});