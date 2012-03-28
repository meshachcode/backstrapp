define(['backstrapp/backstrapp'], function (Backstrapp) {
	return {

		RunTests: function () {
			var testObj = {}, m = {}, ch = 'someEvent', sub = {}, pub = {}, testFunction;

			module('Core: Mediator: Init', {
				setup: function () {
					m = new Backstrapp.Mediator();
					ok(m, 'returns something!');
					ok(m.get('util').isFunction(m.publish), 'publish is a function!');
					ok(m.get('util').isFunction(m.subscribe), 'subscribe is a function!');
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates', function () {});
			
			module('Core: Mediator: PubSub', {
				setup: function () {
					m = new Backstrapp.Mediator();
					ok(m, 'returns something!');
					ok(m.get('util').isFunction(m.publish), 'publish is a function!');
					ok(m.get('util').isFunction(m.subscribe), 'subscribe is a function!');
				},
				teardown: function () {
				}
			});

			test('Properly subscribes / publishes', function () {
				testFunction = function (obj) {
					ok(obj.testParam, 'Properly passes params through publish');
				}
				sub = m.subscribe(ch, testFunction);
				ok(sub.success, 'Successfully subscribes to event: ' + sub.success);
				equal(sub.ch, ch, 'Properly assigns channel');
				pub = m.publish(ch, {testParam: 'test'});
				ok(pub.success, 'Successfully publishes to event: ' + pub.success);
			})
		}
	};
});