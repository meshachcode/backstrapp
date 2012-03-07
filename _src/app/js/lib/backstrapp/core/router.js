/*
	Backstrapp Router.
	The idea is that it simply recognizes a series of basic, RESTful routes, and fires events accordingly.
*/

define(['underscore', 'backbone'], function (_, Backbone) {
	var Router = Backbone.Router.extend({
		routes: {
			''		:	'page',
			':page'	:	'page'
		},
		start: function () {
			Backbone.history.start();
		}
	});
	return Router;
});