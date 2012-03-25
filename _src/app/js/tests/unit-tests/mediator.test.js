define(['jsonLoad!./config.test.json', 'core/mediator'], function (conf, Mediator) {
	return {

		RunTests: function () {
			var testObj = {};
			var m = new Mediator();

			module('Core: Mediator: Init', {
				setup: function () {
					testObj = { test: true };
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates', function () {
				ok(m, 'returns something!');
				ok(m.get('util').isFunction(m.publish), 'publish is a function!');
				ok(m.get('util').isFunction(m.subscribe), 'subscribe is a function!');
			});
		}
	};
});