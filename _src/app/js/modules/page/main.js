/**
	* Page Module
*/

define(['backstrapp/modules/router.module.0.2'], function (RouteModule) {

	var PageModule = RouteModule.extend({
		routes: {
			'test'		:		'testRoute'
		}
	});

	return {
		instance: {},
		init: function (request) {
			console.log('init', request);
			this.instance = new PageModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	}
});