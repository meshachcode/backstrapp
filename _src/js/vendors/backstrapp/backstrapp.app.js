define([
	'order!wrap!backbone',
	'order!json!vendors/backstrapp/bs.config.json',
	'vendors/backstrapp/routers/router',
	'vendors/backstrapp/events/vent',
	'vendors/backstrapp/models/data.model'
], 
function (Backbone, Config, Router, Vent, Data) {

	var App = Backbone.Model.extend({
		defaults: {
			config: Config
		},
		
		validation: {
			request: 'requestHandler'
		},
		
		initialize: function (config) {
			if (config) {
				this.set({ config : config });
			}
			_.bindAll(this, 'startRouter', 'changeHandler', 'requestHandler');
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

		requestHandler: function (obj) {
			console.log('requestHandler');
			if (obj != undefined) {
				console.log('requestHandler', obj.data);
				console.log(obj.data);
			}
		}
	});

	return function (c) {
		var app = new App(c);
		return {
			Router: app.Router,
			Vent: app.Vent,
			Model: app.Model,
			Data: app.Data
		}
	}

});