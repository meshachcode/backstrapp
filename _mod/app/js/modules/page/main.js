define(['json!data/config.json', 'underscore', './utils', 'util/content-builder', 'util/module-activator', './facade', './router'],
function (config, _, utils, builder, activator, facade, router) {

	var el, html = '';
	var page = {
		defaultPage: 'home',
		pagesDir: 'html/test/',
		router: {},

		init: function (params) {
			_.bindAll(this, 'render', 'loadPage', 'route');
			this.router = new router();
			this.router.bind('route:page', this.route);
			this.router.start();
			return {};
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

		processParams: function (params) {
			var paramObj = utils.objectifyParams(params);
			this.subscribe(paramObj.page);
			this.getPage(paramObj.page);
		},
		
		getPage: function (page) {
			var pagePath = this.getPagePath(page);
			this.loadPage(pagePath, function (response) {
				html = response;
				facade.publish(page, 'renderDone', page);
			});
		},

		getPagePath: function (page) {
			return this.pagesDir + page + '.html';
		},

		loadPage: function (page, callback) {
			require(['text!' + page], callback);
		},
				
		render: function () {
			el.html(html);
		    builder.execute(el);
		    activator.execute(el);
		}
	};

	return {
		init: function (item, params) {
			el = item;
			page.init(params);
			return {};
		}
	};
});