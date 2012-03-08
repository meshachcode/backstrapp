/**
	* Page Module
*/

define(['underscore', 'lib/backstrapp/module', './router', 'core/facade'],

function (_, mod, router, facade) {
	var Module = new mod();

	Module.extend({
		/*
			* @props
				- sourceDir: Where are the pages coming from?
				- routerPageEvent: how do I know when a route event has fired?
				- renderPageEvent: how do I know when a page is ready to render?
		*/
		sourceDir			: 'html/app/pages/',
		routerPageEvent		: 'routerPageModule',
		renderPageEvent		: 'renderPageModulePage',

		/*
			* @method init
				- bind this to methods called by callback
				- call the ancestor init()
				- subscribe to the router and render events
				- create a new router, passing it my info
				- return exports object, which will contain validation status, error messages, and data
		*/
		init: function (item, params) {
			_.bindAll(this, 'getPage', 'validate');
			this.base(item, params);

			facade.subscribe(this.name, this.routerPageEvent, this.getPage);
			facade.subscribe(this.name, this.renderPageEvent, this.render);

			this.router = this.initRouter();
			return this.exports();
		},
		
		initRouter: function () {
			var r = new router({ name: this.name, event: this.routerPageEvent });
			r.start();
			return r;
		},

		getPage: function (page) {
			console.log('page', page);
			var path = this.sourceDir + page + '.html';
			this.utils.loadView(path, this.validate);
		},
		
		validate: function (response) {
			this.set({
				isValid: true,
				html: response
			});
			this.publish(response, this.renderPageEvent);
		}		
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	}
});