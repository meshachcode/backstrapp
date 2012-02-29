define([
	'order!wrap!underscore',
	'order!wrap!backbone',
	'order!json!vendors/backstrapp/bs.config.json',
	'vendors/backstrapp/routers/router',
	'vendors/backstrapp/events/vent',
	'vendors/backstrapp/models/data.model',
	'vendors/backstrapp/models/backstrapp.model'
], 
function (_, Backbone, Config, Router, Vent, Data, Model) {

	var App = function (c) {

		if (!c) {
			var c = Config;
		}
		
		console.log('c', c);

		changeHandler = function (e) {
			console.log('app: changeHandler', arguments, c.requests);
			var funcs = _.functions(this),
				event = e.replace('route:', '');

			if (funcs[event] == undefined && c.requests[event]) {
				this.trigger('request:' + c.requests[event], this);
			}
		}

		startRouter = function (router) {
			router.on("all", changeHandler);
			Backbone.history.start();
			console.timeEnd('app');
		}

		return {

			Router: new Router(startRouter, c.routes, c.requests),
			Vent: Vent,
			Model: new Model(c.model),
			Data: new Data(c.data)

		}

	}

	return function (c) {
		return App(c);
	};

});