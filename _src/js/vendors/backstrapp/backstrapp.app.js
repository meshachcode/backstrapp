define([
	'json!vendors/backstrapp/bs.config.json',
	'vendors/backbone/plugins/backbone.validation',
	'vendors/backstrapp/routers/router',
	'vendors/backstrapp/models/data.model',
	'vendors/backstrapp/events/vent'
], function (Config, Validation, Router, Data, Vent) {

	_.extend(Backbone.Model.prototype, Validation);

	var App = Backbone.Model.extend({
		defaults: {
			config: Config
		},
		
		initialize: function (config) {
			this.config = config || this.config;
			_.bindAll(this, 'startRouter', 'changeHandler', 'requestHandler');
			this.bind('change:request', this.requestHandler, this);
			this.Data = new Data(this.get('config').data);
			this.Vent = Vent;
			this.Router = new Router();
			this.Router.setup(this.startRouter, this.get('config').routes, this.get('config').requests);
		},

		startRouter: function () {
			console.log('starting router');
			this.Router.on("all", this.changeHandler);
			this.Router.start();
		},

		changeHandler: function (e) {
			console.log('changeHandler');
			var event = e.replace('route:', '');			

			if (this.Router.requests[event] != undefined) {
				var req = {
					module	: this.Router.requests[event].module,
					view	: this.Router.requests[event].view,
					id		: event,
					data	: arguments
				};
				this.set({ request: req });
				console.log('req', this.get('request'));
			}
		},

		requestHandler: function () {
			console.log(this.get('request'));
		}
	});

	return function (c) {
		var app = new App(c);
		return {
			Router: app.Router,
			Vent: app.Vent,
			Data: app.Data
		}
	}

});