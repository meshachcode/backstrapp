/**
	* Page Module
*/
define(['json!data/config.json', 'underscore', 'lib/backstrapp/module', './router', './facade'],

function (config, _, mod, router, facade) {
	var Module = new mod();

	Module.extend({
		page:				'home',
		pagesDir: 			'html/test/',
		renderPageEvent:	'renderPageModulePage',
		router: 			{},

		init: function (item, params) {
			_.bindAll(this, 'changeHandler', 'getPage', 'validate');
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(params);
			facade.subscribe(this.name, this.routerEvent, this.getPage);
			facade.subscribe(this.name, this.renderPageEvent, this.render);
			this.router = new router();
			this.router.bind('all', this.changeHandler);
			this.router.start();
			return this.exports();
		},

		changeHandler: function () {
			facade.publish(this.name, this.routerEvent, arguments);
		},

		getPage: function () {
			var path = this.pagesDir + this.page + '.html';
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