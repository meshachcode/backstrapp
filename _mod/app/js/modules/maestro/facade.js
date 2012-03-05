define(['underscore', './mediator', './permissions'], function (_, mediator, permissions) {
	var facade = facade || {};
	facade.subscribe = function (subscriber, channel, callback) {
		console.log('subscribe', subscriber, channel);
		if (permissions.validate(subscriber, channel)) {
			mediator.subscribe(channel, callback);
		}
	}
	facade.publish = function (subscriber, channel, params) {
		console.log('publish', subscriber, channel);
		if (permissions.validate(subscriber, channel)) {
			mediator.publish(channel, params);
		}
	}
	return facade;
});
