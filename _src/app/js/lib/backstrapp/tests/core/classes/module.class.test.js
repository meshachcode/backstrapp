define(['backstrapp/core/classes/module.class.0.4'], function (ModuleClass) {

	return {

		RunTests: function () {
			var facade = {};
			var request = {};
			var testFunction = function () {
/* 				console.log('Facade: testFunction', arguments); */
				QUnit.start();
			};

			module('Core: Facade', {
				setup: function () {
					facade.f = new Backstrapp.Facade();
					ok(facade.f, 'returns something!');
					request = {s: 'testModule', ch: 'testModuleInitComplete', fn: testFunction};
				},

				teardown: function () {
					delete facade.f;
				}
			});

			test('Properly Instantiates', function () {
				ok(facade.f.get('util'), 'util object is in place');
				ok(facade.f.get('util').isFunction(facade.f.publish), 'publish is a function!');
				ok(facade.f.get('util').isFunction(facade.f.subscribe), 'subscribe is a function!');
			});

			test('Subscribe Works Properly with default settings', function () {
				var result = facade.f.subscribe(request.s, request.ch, request.fn);
				equal(result.success, 'subscription set', 'Subscribe returns success object : ' + result.success);
				equal(result.ch, request.ch, 'Subscribe returns success object properly with channel : ' + result.ch);
				equal(result.s, request.s, 'Subscribe returns success object properly with subscriber : ' + result.s);
			});

			test('Publish Works Properly with default settings', function () {
				var sub = facade.f.subscribe(request.s, request.ch, request.fn);
				if (sub.success) {
					var result = facade.f.publish(sub.s, sub.ch, {testParams: 'testValue'});
					equal(result.success, 'published event', 'Subscribe returns success object : ' + result.success);
					equal(result.ch, request.ch, 'Subscribe returns success object properly with channel : ' + result.ch);
					equal(result.s, request.s, 'Subscribe returns success object properly with subscriber : ' + result.s);
				} else {
					console.log('SUBSCRIPTION ERROR', sub.error);
				}
			});

			test('Quiet Mode.Subscribe Working Properly', function () {
				var mode = facade.f.subscribeMode = false;
				var result = facade.f.subscribe(request.s, request.ch, request.fn);
				equal(result.error, 'Subscribe Mode is off', 'Subscribe returns error object : ' + result.error);
			});

			test('Quiet Mode.Publish Working Properly', function () {
				var mode = facade.f.publishMode = false;
				var result = facade.f.publish(request.s, request.ch, request.fn);
				equal(result.error, 'Publish Mode is Off!', 'Publish returns error object : ' + result.error);
			});
		}
	};
});