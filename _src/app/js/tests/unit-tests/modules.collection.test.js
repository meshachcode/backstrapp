define(['core/collections/modules.collection'], function (ModulesCollection) {
	return {

		RunTests: function () {
			var Modules = {};
			var request = {};
			var listener = {};
			var testModules = [
				{ name: 'testModuleA', 	path: '/app/js/modules/jquibs/message.js'},
				{ name: 'testModuleB', 	path: '/app/js/modules/jquibs/message.js'},
				{ name: 'testModuleC', 	path: '/app/js/modules/jquibs/message.js'}
			];

			module('Core: ModulesCollection', {
				setup: function () {
					console.count();
					Modules = new ModulesCollection();
					Modules.reset(testModules);
					request = {
						name: 'testModuleA',
						el: $('<div>Test Module</div>'),
						path: '/app/js/modules/jquibs/message.js'
/* 						arg: {} */
					};
					ok(Modules, 'returns Object!');
					deepEqual(Modules.toJSON(), testModules, 'Properly sets default modules');
				},

				teardown: function () {
				}
			});
			
			test('Properly loads modules sent by reset', function () {
				console.log('Modules', Modules);
			});
			
			test('Properly returns messages from buildReturnObject', function () {
				var e = Modules.buildReturnObject('error', 'moduleLoad', request);
				equal(e.error, Modules.messages.error.moduleLoad, 'Error message properly returned: ' + e.error);

				var p = Modules.buildReturnObject('promise', 'moduleLoad', request);
				equal(p.promise, Modules.messages.promise.moduleLoad, 'Promise message properly returned: ' + p.promise);

				var s = Modules.buildReturnObject('success', 'moduleLoad', request);
				equal(s.success, Modules.messages.success.moduleLoad, 'Success message properly returned: ' + s.success);
			});

			asyncTest('Properly loads a module', function () {
				var testFunction = function (mod) {
					ok(mod, 'Properly returns an object');
					ok(mod.get('name'), 'Properly returns name: ' + mod.get('name'));
					QUnit.start();
				}
				// loadModule takes the module path, and calls the callback
				Modules.loadModule(request.path, testFunction);
			});

		test('Properly checks if a module is loaded', function () {
				var modName = testModules[1].name;
				var modB = Modules.getModuleByName(modName);
				equal(modB.get('name'), modName, 'Properly returns module by name : ' + modB.get('name'));

				var modPath = testModules[1].path;
				var modC = Modules.getModuleByPath(modPath);
				equal(modC.get('path'), modPath, 'Properly returns module by path : ' + modC.get('path'));

				var testFunctionB = function (result) {
					console.log('result', result);
				};
				var query = {name: modName, path: modPath};
				var modC = Modules.getModule(query, testFunctionB);
				console.log('modC', modC);
/* 				ok(modC, 'Properly returns module with getModule and correct request : ' + modC.get('name')); */
			});

/*
			test('Properly checks if a module exists', function () {
			});
*/

		}
	};
});