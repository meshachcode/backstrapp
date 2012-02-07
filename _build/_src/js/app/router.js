// Filename: router.js
define(['jQuery', 'Underscore', 'Backbone', 'models/data', 'events/vent'], 

function($, _, Backbone, DataModel, Vent) {

	var AppRouter = Backbone.Router.extend({

		initialize: function() {
			Backbone.history.start();
		},

		routes: {
			'/:page': 	'pageAction',
			'/home'	:	'defaultAction',
			// Default
			'*actions': 'defaultAction'
		},

		pageAction: function(page) {
			debug.debug('Router.pageAction()');
			DataModel.set({requestedPage: page});
			Vent.trigger('navigate:page');
		},

		defaultAction: function(actions) { // We have no matching route, lets display the home page 
			debug.debug('Router.defaultAction()');
			DataModel.set({requestedPage: 'home'});
			Vent.trigger('navigate:page');
		}
	});

	return AppRouter;
});
