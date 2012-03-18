/**
	* Backstrapp Router Module
*/

define(['lib/backstrapp/module.class.0.2', './router.0.2', 'core/facade'],

function (ModuleClass, router, f) {

	var BackstrappRouterModule = ModuleClass.extend({
		autoload			: true,
		sourceDir			: 'html',
		events 				: {
			'restoreComplete'	: 'getPage',
			'routeComplete'		: 'getPage',
			'loadReady'			: 'loadView',
			'loadViewComplete'	: 'process',
			'processComplete'	: 'setHtml',
			'setHtmlComplete'	: 'activate',
			'activateComplete'	: 'render'
		},

		/*
			* @property constructor
		*/
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'render', 'getPage');
			return this.base(request);
		},

		/*
			* @method start
		*/
		start: function () {
			var e = this.name + 'RouteComplete';
			this.router = new router({ name: this.name, event: e });
			if (this.routes != undefined) {
				f.util.extend(this.router.routes, this.routes);
			}
			this.router.start();
			this.base();
		},

		/*
			* @method getPage
		*/
		getPage: function (page) {
			var me = this;
			f.getPage(page, function (p) {
				me.set({ page: p.id });
				me.view = me.sourceDir + '/' + p.file;
				me.publish('loadReady');
			});
		},

		/*
			* @method render
		*/
		render: function (el, html) {
			this.hide();
			this.base(el, html);
			this.show(this.animation.time);
		}
	});
	
	return BackstrappRouterModule;

});