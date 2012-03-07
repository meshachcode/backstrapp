/*
	Backstrapp Router.
	The idea is that it simply recognizes a series of basic, RESTful routes, and fires events accordingly.
*/
define(['underscore', 'backbone'], function (_, Backbone) {
	var Router = Backbone.Router.extend({
		routes: {
			''						: 'home',
			'/'						: 'home',
			'help'					: 'help',
			':page'					: 'page',
			'search/:query'			: 'search',
			'search/:query/p:page'	: 'search'
		},
		start: function () {
			Backbone.history.start();
		}
	});
	return Router;
});
