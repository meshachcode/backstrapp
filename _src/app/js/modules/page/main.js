/**
	* Page Module
*/

define(['lib/backstrapp/router.module.0.2'], function (RouterModuleClass, router) {

	var PageModule = RouterModuleClass.extend({
		routes: {
			'test'		:		'testRoute'
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