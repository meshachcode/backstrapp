/**
	* Page Module
*/

define(['lib/backstrapp/module_new', './router', 'core/facade'],

function (mod, router, f) {
	var Module = new mod();

	Module.extend({
		autoload			: true,
		/* @property sourceDir (NO TRAILING SLASH) */
		sourceDir			: 'html/app/pages',
		/* @property view (FULL PATH) */
		view				: 'html/app/pages/home.html',

		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.subscribe(this.name, this.events.routeComplete, this.getPage);
			this.subscribe(this.name, this.events.loadReady, this.loadView);
			this.subscribe(this.name, this.events.loadViewComplete, this.process);
			this.subscribe(this.name, this.events.processComplete, this.setHtml);
			this.subscribe(this.name, this.events.setHtmlComplete, this.activate);
			this.subscribe(this.name, this.events.activateComplete, this.render);
			this.router = this.initRouter();
			// no need to call this.base(), 'cause getPage handles load from the router
		},

		/*
			* @method initRouter
			* start the router and tell it how to trigger an event
		*/
		initRouter: function () {
			var r = new router({ name: this.name, event: this.events.routeComplete });
			r.start();
			return r;
		},

		/*
			* @method getPage
			* this sets the view to the selected page
		*/
		getPage: function (page) {
			this.set({ page: page });
			this.view = this.sourceDir + '/' + page + '.html';
			this.publish(this.name, this.events.loadReady);
		}
	});

	return {
		init: function (item, params) {
			// bindAll here to allow the module to pass 'autoload:true' to the constructor,
			// and avoid the need for an extra init() call 
			f.util.bindAll(Module, 'start', 'getPage');
			return Module._init(item, params);
		}
	}
});