define(['underscore', 'backbone', 'core/facade'], function (_, Backbone, facade) {

	var Router = Backbone.Router.extend({

		routes: {
			''		:	'home',
			'home'	:	'home',
			':page'	:	'page'
		},
		
		initialize: function (config) {
			// setup the details needed to properly publish route events to facade
			if (!config) {
/* 				console.log('no config!'); */
				return;
			}
			_.extend(this, config);
		},

		home: function () {
			facade.publish(this.name, this.event, 'home');
		},

		page: function (p) {
/* 			console.log('router.page', arguments, this.event); */
			facade.publish(this.name, this.event, p);
		},

		start: function () {
			Backbone.history.start();
		}
		
	});

	return Router;

});