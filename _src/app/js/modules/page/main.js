/**
	* Page Module
*/

define(['underscore', 'lib/backstrapp/module', './router', 'core/facade'],

function (_, mod, router, f) {
	var Module = new mod();

	Module.extend({
		sourceDir			: 'html/app/pages/',

		init: function (item, params) {
			_.bindAll(this, 'getPage', 'start');
			// setup the module name and el
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(item, params);
			f.subscribe(this.name, this.events.routerEvent, this.getPage);
			this.router = this.initRouter();
			return this.exports();
		},
		
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