define(['core/facade'], function (f) {
	return {

		RunTests: function () {
			var testObj = {};

			module('Core: Facade', {
				setup: function () {
						testObj = { test: true };
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates', function () {
				ok(f, 'returns something!');
				ok(f.get('util'), 'util object is in place');
				ok(f.get('util').isFunction(f.publish), 'publish is a function!');
				ok(f.get('util').isFunction(f.subscribe), 'subscribe is a function!');
			});
			
			test('Subscribe Works Properly with default settings', function () {
				ok(f.subscribe(), 'Can Subscribe to standard event in same module');
			});
/*
			test('Quiet Mode.Subscribe Working Properly', function () {
				var mode = f.set({subscribeMode: false});
				ok(!permissions.validate(request, subscriber, channel), 'CANNOT Subscribe if mode.Subscribe is false');
				ok(permissions.validate('publish', subscriber, channel), 'Publish still works if mode.Subscribe is false');
			});
*/

/*
			test('Quiet Mode.Publish Working Properly', function () {
				permissions.mode.publish = false;
				ok(!permissions.validate('publish', subscriber, channel), 'CANNOT Publish if mode.Publish is false');
				ok(permissions.validate(request, subscriber, channel), 'Subscribe still works if mode.Publish is false');
			});
*/
/*
			test('', function () {
				
			});
*/
		}
	};
});