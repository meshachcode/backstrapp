define(['jsonLoad!./config.test.json', 'core/mediator'], function (conf, m) {
	return {

		RunTests: function () {
			var testObj = {};
			var mediator = m;

			module('Core: Mediator', {
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