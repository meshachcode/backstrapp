define(['jsonLoad!./config.test.json', 'core/mediator'], function (conf, Mediator) {
	return {

		RunTests: function () {
			var testObj = {};
			var m = {};

			module('Core: Mediator', {
				setup: function () {
					m = new Mediator();
					ok(m, 'returns something!');
					ok(m.get('util').isFunction(m.publish), 'publish is a function!');
					ok(m.get('util').isFunction(m.subscribe), 'subscribe is a function!');
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates', function () {});
			
			test('Properly subscribes', function () {
			});
			
			test('Properly publishes', function () {
			})
		}
	};
});