define(['wrap!backbone'], function (Backbone) {

	var r = Backbone.Router.extend({
		routes			: {
			""						: "home",
	        "/"						: "home",
	        "/home"					: "home",
			"/api/:page/:view/:id"	: "api",
			"/api/:page/:view"		: "api",
			"/api/:page"			: "api",
			"/:page/:view/:id"		: "page",
			"/:page/:view"			: "page",
			"/:page"				: "page"
		},
		
		requests 		: {
			"home"			: {
				module			: "page",
				view			: "static"
			},
			"api"			: {
				module			: "api",
				view			: "json"
			},
			"page"			: {
				module			: "page",
				view			: "template"
			}
		},

		setup: function () {
			_.bindAll(this, 'loadRoutes', 'loadRequests', 'start');
			var callback, routes, requests;

			switch (arguments.length) {
				case 3:
					// callback, routes, requests
					callback = arguments[0];
					routes = arguments[1];
					requests = arguments[2];
					this.loadRequests(requests, routes, callback);
					break;
				case 2:
					// callback, routes
					callback = arguments[0];
					routes = arguments[1];
					this.loadRoutes(routes, callback);
					break;
				case 1:
					// callback
					callback = arguments[0];
					callback();
					break;
				default:
					this.on("all", this.changeHandler);
					this.start();
					break;
			}
		},
		
		changeHandler: function (e) {
			var funcs = _.functions(this),
				event = e.replace('route:', '');

			if (funcs[event] == undefined && this.requests[event]) {
				this.trigger('request:' + this.requests[event], this);
			}
		},

		loadRequests: function (requests, routes, callback) {
			var i;
			for ( i in requests ) {
				this.requests[i] = requests[i];
			}
			this.loadRoutes(routes, callback);
		},

		loadRoutes: function (routes, callback) {
			var i;
			for ( i in routes ) {
				this.routes[i] = routes[i];
			}
			callback(this);
		},

		start: function () {
			Backbone.history.start();
			console.timeEnd('router');
		}

	});

	return r;
});
