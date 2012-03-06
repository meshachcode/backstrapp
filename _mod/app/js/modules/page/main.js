/**
	* Page Module
*/
define(['json!data/config.json', 'underscore', 'lib/backstrapp/module', './router', './facade'],

function (config, _, mod, router, facade) {
	var Module = new mod();

	Module.extend({
		defaultPage: 'home',
		pagesDir: 'html/test/',
		router: {},

		init: function (item, params) {
			_.bindAll(this, 'publishPage');
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(params);
			this.router = new router();
			this.router.bind('all', this.publishPage);
			this.router.start();
			return this.exports();
		},

		publishPage: function (e, v) {
			facade.publish(this.name, this.routerEvent, arguments);
		}
	});

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	}
});