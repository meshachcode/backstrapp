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
			'/:app'				: 		'appAction',
			'/:app/:view'		:		'appViewAction',
			'/:app/:view/:id'	:		'appViewIdAction',
			'/home'				:		'defaultAction',
			// Default
			'*actions'			:	 	'defaultAction'
		},

		/**
			* Set the global values and trigger the appropriate event
			* @method appAction
		*/
		appAction: function(app) {
			DataModel.set({requestedPage: app});
			Vent.trigger('navigate:page');
		},

		/**
			* Set the global values and trigger the appropriate event
			* @method appAction
		*/
		appViewAction: function(app, view) {
			debug.debug(DataModel.get('currentPage'));
			if (app != DataModel.get('currentPage').name) {
				DataModel.set({requestedPage: app});
			}
			DataModel.set({requestedView: view});
			Vent.trigger('navigate:view');
		},

		/**
			* Set the global values and trigger the appropriate event
			* @method appAction
		*/
		appViewAction: function(view, id) {
			DataModel.set({requestedView: view});
			DataModel.set({requestedId: id});
			Vent.trigger('navigate:view');
		},

		/**
			* We have no matching route, lets display the home page 
			* @method defaultAction
			* @param {string} actions
		*/
		defaultAction: function(actions) { 
			DataModel.set({requestedPage: 'home'});
			Vent.trigger('navigate:page');
		}
	});

	return AppRouter;
});
