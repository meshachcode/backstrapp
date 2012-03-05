define(['json!data/config.json', 'underscore', 'lib/backstrapp/module', './router'], function (config, _, mod, router) {
	var Module = new mod();

	Module.extend({
		defaultPage: 'home',
		pagesDir: 'html/test/',
		router: {},

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
			Module.router = new router();
			Module.router.bind('route:page', this.route);
			Module.router.start();
			var n = $(item).attr('id');
			Module.set({ name: n, el: item });
			Module.base(params);
			return Module.exports();
		}
	}
});