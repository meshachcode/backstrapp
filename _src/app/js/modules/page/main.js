/**
	* Page Module
*/

define(['jsonLoad!json/config.json', 'backstrapp/modules/router.module.0.2', 'modules/page/pages.collection'], 

function (config, RouteModule, PagesCollection) {

	var PageModule = RouteModule.extend({
		debug: {
/* 			subscribe: true, */
/* 			publish: true */
		},

		routes: {
			'test'		:		'testRoute'
		},

		constructor: function (request) {
			this.util.bindAll(this, 'getPage');
			this.pages = new PagesCollection();
/* 			this.pages.fetch({ success: this.pagesLoaded }); */
			this.base(request);
			this.loadPages(config.pages);
		},
		
		loadPages: function (pages) {
			for (var i in pages) {
				this.pages.add(pages[i]);
			}
			this.publish('pagesLoaded', this.pages.getPages());
		},

		getPage: function (page) {
			var me = this;
			this.pages.getPage(page, function (p) {
				me.set({ page: p.name });
				me.view = me.sourceDir + '/' + p.file;
				me.publish('loadReady');
			});
		}
	});

	return {
		instance: {},
		init: function (request) {
			this.instance = new PageModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	}
});