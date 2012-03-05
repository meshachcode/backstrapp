define(['underscore', 'util/content-builder', 'util/module-activator', './facade', './router'],
function (_, builder, activator, facade, router) {

	var el, html = '';
	var page = {
		pagesDir: 'html/test/',
		router: {},

		init: function (params) {
			_.bindAll(this, 'render', 'loadPage', 'route');
			this.router = new router();
			this.router.bind('route:page', this.route);
			this.router.start();
		},
		
		route: function (page) {
			this.subscribe(page);
			this.getPage(page);
		},
		
		subscribe: function (page) {
			facade.subscribe(page, 'renderDone', this.render);
		},

		processParams: function (params) {
			var paramObj = page.objectifyParams(params);
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
		
		objectifyParams: function (paramStr) {
			var pObj = {}, pArr = [], iArr = [];
			pArr = paramStr.split(',');
			_.each(pArr, function (i) {
				iArr = i.split(':');
				pObj[iArr[0]] = iArr[1];
			});
			return pObj;
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
		}
	};
});