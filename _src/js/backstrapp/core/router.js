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
			'/api/:page'				:		'apiPageAction',
			'/api/:page/:view'			:		'apiPageViewAction',
			'/api/:page/:view/:id'		:		'apiPageViewAction',
			'/:page'					:		'pageAction',
			'/:page/:view'				:		'pageViewAction',
			'/:page/:view/:id'			:		'pageViewAction'
		},
		
		pageAction: function (page) {
			var obj = {
				id			: 	null,
				name		:	page,
				type		:	'page',
				view		:	'default'
			};
			this.requestPage(obj);
		},
		
		pageViewAction: function (page, view, id) {
			var obj = {
				id			: 	id,
				name		:	page,
				type		:	'page',
				view		:	view
			};
			this.requestPage(obj);
		},

		apiPageAction: function (page) {
			var obj = {
				id			: 	null,
				name		:	page,
				type		:	'page',
				view		:	'index'
			};
			this.requestPage(obj);
		},
		
		apiPageViewAction: function (page, view, id) {
			var obj = {
				id			: 	id,
				name		:	page,
				type		:	'page',
				view		:	view
			};
			this.requestPage(obj);
		},
		
		requestPage: function (obj) {
			DataModel.set({ page : obj }, {
				error: function (model, error) {
					debug.debug('router error', model, error);
				}
			});
		}
	});

	return AppRouter;
});
