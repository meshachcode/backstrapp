define(['jQuery', 'Underscore', 'Backbone'], function ($, _, Backbone) {
	/**
		* @class Router
		* @extends Backbone.Router
	*/
	var AppRouter = Backbone.Router.extend({
		/**
			* Initiates Backbone.history
			* @method initalize
		*/
		initialize: function () {
			this.bind('call', this.test, this);
			_.bindAll(this, 'slugAction');
			Backbone.history.start();
		},
		/**
			* @property routes
		*/
		routes: {
			'': 'homeAction',
            '!': 'homeAction',
            '/': 'homeAction',
            '!/': 'homeAction',
			'/api/:page/:view/:id': 'apiViewAction',
			'/api/:page/:view': 'defaultAction',
			'/api/:page': 'defaultAction',
			'/:slug': 'slugAction',
			'!/:slug': 'slugAction',
			'/:module/:view': 'defaultAction',
			'!/:module/:view': 'defaultAction',
			'/:module/:view/:slug': 'defaultAction',
			'!/:module/:view/:slug': 'defaultAction'
		},

		defaultAction: function () {
			debug.debug('defaultAction');
			this.processRawParams(arguments);
		},

		slugAction: function (slug) {
			debug.debug('slugAction');
			var $this = this, request = DataModel.defaults.request;
			request.params.slug = slug;
			DataModel.set({
				request: request
			}, {
				error: function (model, error) {
					$this.handleErrors(error, slug);
				}
			});
		},
        
		handleErrors: function (error, slug) {
			var $this = this;
			switch (error.type) {
				case 'data':
					DataModel.loadDataToModel('pages', 'pages', function () {
						$this.slugAction(slug);
					});
					break;
				case 'page':
					debug.error(error.msg, slug);
					break;
				case 'module':
					debug.error(error.msg, slug);
					break;
			}
		},

		processRawParams: function () {
			debug.debug('processRawParams');
			var i = 1,
				request = DataModel.get('request');
			[].reverse.apply(request.rawParams);
			_.each(request.rawParams, function (param) {
				switch (i) {
				case 3:
					request.params.module = param;
					break;
				case 2:
					request.params.view = param;
					break;
				default:
					request.params.slug = param;
					break;
				}
				i++;
			});
			debug.debug('processed request', request); /*DataModel.set({
				request: request
			})*/
			; //DataModel.trigger('change:params');
		},
        
        homeAction: function(){
            this.slugAction('homeowner-support-citimortgage');
        }
	});
	return AppRouter;
});
