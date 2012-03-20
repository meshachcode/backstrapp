/**
	* Page Module
*/

define(['backstrapp/modules/router.module.0.2', 'modules/page/pages.collection'], function (RouteModule, PagesCollection) {

	var PageModule = RouteModule.extend({
		debug: {
			publish: true
		},
		routes: {
			'test'		:		'testRoute'
		},
		
		constructor: function (request) {
			this.util.bindAll(this, 'pagesLoaded');
			PagesCollection.bind('reset', this.pagesLoaded, this);
			PagesCollection.fetch();
			this.base(request);
		},
		
		pagesLoaded: function () {
			var pages = PagesCollection.getPages();
			this.publish('pagesLoaded', pages);
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