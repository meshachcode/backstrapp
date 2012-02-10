define(['jQuery', 'Underscore', 'Backbone', 'models/data.model', 'events/vent'], 

function($, _, Backbone, DataModel, Vent) {

	/**
		* @class Router
		* @extends Backbone.Router
	*/
	var AppRouter = Backbone.Router.extend({

		/**
			* Initiates Backbone.history
			* @method initalize
		*/
		initialize: function() {
			Backbone.history.start();
		},

		/**
			* @property routes
		*/
		routes: {
			'/:page': 	'pageAction',
			'/home'	:	'defaultAction',
			// Default
			'*actions': 'defaultAction'
		},

		/**
			* Set the global values and trigger the appropriate event
			* @method pageAction
			* @param {string} page
		*/
		pageAction: function(page) {
			debug.debug('Router.pageAction()');
			DataModel.set({requestedPage: page});
			Vent.trigger('navigate:page');
		},

		/**
			* We have no matching route, lets display the home page 
			* @method defaultAction
			* @param {string} actions
		*/
		defaultAction: function(actions) { 
			debug.debug('Router.defaultAction()');
			DataModel.set({requestedPage: 'home'});
			Vent.trigger('navigate:page');
		}
	});

	return AppRouter;
});
