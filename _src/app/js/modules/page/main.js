/**
	* Page Module
	
	
	BUG: this.template isn't being set before load() runs. fix that.
	
	
*/

define(['underscore', 'lib/backstrapp/module', './router', 'core/facade'],

function (_, mod, router, f) {
	var Module = new mod({ autoload: true });

	Module.extend({
		sourceDir			: 'html/app/pages/',

		init: function (item, params) {
			_.bindAll(this, 'getPage', 'start');
			this.base(item, params);
			f.subscribe(this.name, this.events.routerEvent, this.getPage);
			this.router = this.initRouter();
			return this.exports();
		},
			
/* 		startup the router and tell it how to call an event */
		initRouter: function () {
			var r = new router({ name: this.name, event: this.events.routerEvent });
			r.start();
			return r;
		},

		start: function () {
			f.publish(this.name, this.events.loadReady);
		},

		getPage: function (page) {
			var path = this.sourceDir + page + '.html';
			console.log('path / page', path, page);
		}
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	}
});