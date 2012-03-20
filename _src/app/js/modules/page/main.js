/**
	* Page Module
*/

define(['backstrapp/modules/router.module.0.2', 'modules/page/pages.collection'], function (RouteModule, PagesCollection) {

	var PageModule = RouteModule.extend({
		autoload: false,
		debug: {
/* 			subscribe: true, */
/* 			publish: true */
		},

		routes: {
			'test'		:		'testRoute'
		},

		constructor: function (request) {
			this.util.bindAll(this, 'getPage');
			PagesCollection.bind('reset', this.pagesLoaded, this);
			PagesCollection.fetch();
			this.base(request);
		},
		
		pagesLoaded: function () {
			this.start();
			this.publish('pagesLoaded', PagesCollection.getPages());
		},
		
		getPage: function (page) {
			var me = this;
			PagesCollection.getPage(page, function (p) {
				console.log('getPage', p);
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