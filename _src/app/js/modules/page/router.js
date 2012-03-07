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