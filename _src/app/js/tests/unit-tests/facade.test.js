define(['core/facade'], function (Facade) {
	return {

		RunTests: function () {
			var facade = {};
			var request = {};
			var testFunction = function () {
				console.log('testFunction', arguments);
			};

			module('Core: Facade: Init', {
				setup: function () {
					facade.f = new Facade();
					request = {s: 'testModule', ch: 'testModuleInitComplete', fn: testFunction};
				},

				teardown: function () {
					delete facade.f;
				}
			});
			
			test('Properly Instantiates', function () {
				ok(facade.f, 'returns something!');
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
				var result = facade.f.publish(sub.s, sub.ch)
				equal(result.success, 'published event', 'Subscribe returns success object : ' + result.success);
				equal(result.ch, request.ch, 'Subscribe returns success object properly with channel : ' + result.ch);
				equal(result.s, request.s, 'Subscribe returns success object properly with subscriber : ' + result.s);
			});

			test('Quiet Mode.Subscribe Working Properly', function () {
				var mode = facade.f.set({subscribeMode: false});
				var result = facade.f.subscribe(request.s, request.ch, request.fn);
				equal(result.error, 'Subscribe Mode is off', 'Subscribe returns error object : ' + result.error);
			});

			test('Quiet Mode.Publish Working Properly', function () {
				var mode = facade.f.set({publishMode: false});
				var result = facade.f.publish(request.s, request.ch, request.fn);
				equal(result.error, 'Publish Mode is Off!', 'Publish returns error object : ' + result.error);
			});

			module('Core: Facade: getModule', {
				setup: function () {
					facade.f = new Facade();
					request = {
						name: 'testModule',
						el: $('<div>test html</div>'),
						mod: 'modules_js/jquibs/message',
						arg: {title: 'test Title'}
					};
				},

				teardown: function () {
					delete facade.f;
				}
			});

			asyncTest('Properly creates module with valid type', function () {
				facade.f.getModule(request, function (result) {
					var mod = result.init(request);
					ok(mod.model.get('isValid'), 'Properly returns valid module with isValid : ' + result.isValid);
					QUnit.start();
				});
			});
			
			asyncTest('Properly renders module with valid type in default mode', function () {
				facade.f.getModule(request, function (result) {
					console.log('result', result);
					var mod = result.init(request);
					ok(mod.model.get('isVisible'), 'Properly sets isVisible on Render :' + mod.model.get('isVisible'));
					equal(mod.model.get('html'), request.name + ' : ' + mod.model.defaults.html, 'Properly sets default HTML if the setHtml method does not have proper values: ' + mod.model.get('html'));
					QUnit.start();
				});
			});

/* 			TODO: This test will not pass until we implement error handling.  */
/*
			asyncTest('CANNOT create module with invalid request', function () {
				request.mod = 'some/path/to/a/module/that/does/not/exist';
				facade.f.getModule(request, function (result) {
					console.log('result', result);
					ok(result.error, 'Properly returns error message when an invalid module is requested');
					QUnit.start();
				});
			});
*/

		}
	};
});