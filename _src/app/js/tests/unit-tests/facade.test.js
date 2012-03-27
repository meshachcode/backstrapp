define(['core/facade'], function (Facade) {
	return {

		RunTests: function () {
			var facade = {};
			var request = {};
			var testFunction = function () {
				console.log('testFunction', arguments);
				QUnit.start();
			};

			module('Core: Facade: Init', {
				setup: function () {
					console.count();
					console.log('-------- NEW TEST ----------');
					facade.f = new Facade();
					ok(facade.f, 'returns something!');
					request = {s: 'testModule', ch: 'testModuleInitComplete', fn: testFunction};
				},

				teardown: function () {
					console.log('facade.f', facade.f);
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
				console.log('--- sub', sub);
				if (sub.success) {
					console.log('--- # sub', sub.s, sub.ch);
					var result = facade.f.publish(sub.s, sub.ch);
					console.log('--- ## pub', result);
					equal(result.success, 'published event', 'Subscribe returns success object : ' + result.success);
					equal(result.ch, request.ch, 'Subscribe returns success object properly with channel : ' + result.ch);
					equal(result.s, request.s, 'Subscribe returns success object properly with subscriber : ' + result.s);
				} else {
					console.log('SUBSCRIPTION ERROR', sub.error);
				}
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

/*
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
				var testFunctionA = function (result) {
					equal(result.name, request.name, 'Properly sets Module name to : ' + result.name);
					QUnit.start();
				};
				facade.f.subscribe(request.name, request.name + 'InitComplete', testFunctionA);
				facade.f.getModule(request);
			});

			asyncTest('Properly renders module with valid type in default mode', function () {
				var testFunctionB = function (result) {
					ok(result.isVisible, 'Properly sets isVisible on Render :' + result.isVisible);
					console.log('result', result);
					equal(result.el.html(), request.el.html(), 'Properly sets default HTML if the setHtml method does not have proper values: ' + result.el.html());
					QUnit.start();
				};
				facade.f.subscribe(request.name, request.name + 'RenderComplete', testFunctionB);
				facade.f.getModule(request);
			});

			asyncTest('CANNOT create module with invalid request', function () {
				var testFunctionC = function (result) {
					ok(result.error, 'Properly returns error message when an invalid module is requested : ' + result.error);
					QUnit.start();
				}
				request.mod = 'test/error/path';
				var sub = facade.f.subscribe(request.name, 'errorModulePath', testFunctionC);
				if (sub.success) {
					facade.f.getModule(request);
				}
			});
*/
/*
			asyncTest('Properly destroys module upon request', function () {
				facade.f.getModule(request, function (result) {
					console.log('result', result);
					var mod = result.init(request);
					console.log('mod', mod);
					var d = mod.destroy();
					console.log('d', d);
				});
			});
*/

		}
	};
});