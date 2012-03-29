/**
	* Backstrapp Router
	TODO: fix the dependency issues here. the facade shouldn't be loaded in this way. Use Backstrapp.js to handle that stuff.
*/

define(['underscore', 'backbone', 'backstrapp/core/facade'], function (_, Backbone, facade) {

	var BackstrappRouter = Backbone.Router.extend({

		routes: {
			''						: 'home',
			'/'						: 'home',
			'home'					: 'home',
			'help'					: 'help',
			':page'					: 'page',
			'search/:query'			: 'search',
			'search/:query/p:page'	: 'search'
		},
		
		initialize: function (config) {
			// setup the details needed to properly publish route events to facade
			if (config) {
				_.extend(this, config);
			}
		},

		home: function () {
			facade.publish(this.name, this.event, 'home');
		},

		page: function (p) {
			facade.publish(this.name, this.event, p);
		},

		start: function () {
			Backbone.history.start();
		}

	});

	return BackstrappRouter;

});