define(['jQuery', 'Underscore', 'Backbone', 'modules/data/data.module', 'events/vent'], 

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
			'/api/:module'				:		'apiModuleAction',
			'/api/:module/:view/:id'	:		'apiModuleViewAction',
			'/:module'					:		'moduleAction',
			'/:module/:view/:id'		:		'moduleViewAction'
		},
		
		moduleAction: function (module) {
			DataModel.set({
				requested: {
					pagetype	:	'module',
					page		:	module
				}
			});
		},
		
		moduleViewAction: function (module, view, id) {
			debug.debug(module, view, id);
		},
		
		apiModuleAction: function (module) {
			debug.debug(module);
		},
		
		apiModuleViewAction: function (module, view, id) {
			debug.debug(module, view, id);
		}

		/**
			* Set the global values and trigger the appropriate event
			* @method appAction
		*/
/*
		appAction: function(app) {
			DataModel.set({requestedPage: app});
			Vent.trigger('navigate:page');
		},
*/
	});

	return AppRouter;
});
