define(['underscore', 'backbone', 'core/facade'], function (_, Backbone, facade) {

	var Router = Backbone.Router.extend({

		routes: {
			''		:	'home',
			'/'		:	'home',
			'home'	:	'home',
			':page'	:	'page'
		},
		
		initialize: function (config) {
			// setup the details needed to properly publish route events to facade
			if (!config) {
				console.log('no config!');
				return;
			}
			_.extend(this, config);
			console.log('router', this);			
		},

		start: function () {
			Backbone.history.start();
		}
		
	});

	return Router;

});