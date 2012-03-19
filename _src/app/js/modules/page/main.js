/**
	* Page Module
*/

define(['b$'], function (b$) {

	var PageModule = b$.RouteModule.extend({
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