define(['underscore', './mediator', './permissions'], function (_, mediator, permissions) {
	var facade = facade || {};
	facade.subscribe = function (subscriber, channel, callback) {
		if (permissions.validate(subscriber, channel)) {
			mediator.subscribe(channel, callback);
		}
	}
	facade.publish = function (subscriber, channel, params) {
		console.log('maestro facade publish', arguments);
		if (permissions.validate(subscriber, channel)) {
			mediator.publish(channel, params);
		}
	}
	return facade;
});
