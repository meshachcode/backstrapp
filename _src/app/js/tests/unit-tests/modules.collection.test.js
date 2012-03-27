define(['core/collections/modules.collection'], function (ModulesCollection) {
	return {

		RunTests: function () {
			var Modules = {};
			var request = {};
			var listener = {};
			var testModules = [
				{ name: 'testModuleA', 	path: 'modules_js/jquibs/message' },
				{ name: 'testModuleB', 	path: 'modules_js/jquibs/message' },
				{ name: 'testModuleC', 	path: 'modules_js/jquibs/accordion' }
			];

			module('Core: Mediator: Init', {
				setup: function () {
					Modules = new ModulesCollection(testModules);
					request = {
						name: 'testModuleA',
						el: $('<div>Test Module</div>'),
						mod: 'modules_js/jquibs/message'
/* 						arg: {} */
					};
					ok(Modules, 'returns Object!');
					deepEqual(Modules.toJSON(), testModules, 'Properly sets default modules');
				},

				teardown: function () {
				}
			});
			
			test('Properly returns messages from buildReturnObject', function () {
				var e = Modules.buildReturnObject('error', request);
				equal(e.error, Modules.messages.error, 'Error message properly returned: ' + e.error);
				var p = Modules.buildReturnObject('promise', request);
				equal(p.promise, Modules.messages.promise, 'Promise message properly returned: ' + p.promise);
				var s = Modules.buildReturnObject('success', request);
				equal(s.success, Modules.messages.success, 'Success message properly returned: ' + s.success);
			});

			test('Properly loads a module', function () {
				var testFunction = function (mod) {
					ok(mod, 'Properly returns an object');
					ok(mod.get('name'), 'Properly returns name: ' + mod.get('name'));
					QUnit.start();
				}
				// loadModule takes the module path, and calls the callback
				Modules.loadModule(request.mod, testFunction);
			});
			
			test('Properly checks if a module is loaded', function () {
				console.log(Modules.isModuleLoaded({name: 'testModuleA'}));
			});

/*
			test('Properly checks if a module exists', function () {
			});
*/

		}
	};
});