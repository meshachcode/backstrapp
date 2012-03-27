define(['backstrapp/collections/modules.collection'], function (ModulesCollection) {
	return {

		RunTests: function () {
			var Modules = {};
			var request = {};
			var listener = {};
			var testModules = [
				{ name: 'testModuleA', 	path: 'modules_js/jquibs/message'},
				{ name: 'testModuleB', 	path: 'modules_js/jquibs/message'},
				{ name: 'testModuleC', 	path: 'modules_js/jquibs/message'}
			];
			Modules = new ModulesCollection();
			Modules.reset(testModules);

			module('Core: ModulesCollection', {
				setup: function () {
					console.count();
					request = {
						name: 'testModuleA',
						el: $('<div>Test Module</div>'),
						path: 'modules_js/jquibs/message'
/* 						arg: {} */
					};
					ok(Modules, 'returns Object!');
					deepEqual(Modules.toJSON(), testModules, 'Properly sets default modules');
				},

				teardown: function () {
				}
			});
			
			asyncTest('Properly loads a module', function () {
				var testFunction = function (result) {
					var mod = result.instance;
					// this will not contain success/error property yet. getModule does that
					ok(mod, 'Properly returns an object');
					ok(mod.get('name'), 'Properly returns name: ' + mod.get('name'));
					QUnit.start();
				}
				// loadModule takes the module path, and calls the callback
				Modules.loadModule(request, testFunction);
			});

			test('Properly checks if a module is loaded', function () {
				var modName = testModules[1].name;
				var modB = Modules.getModuleByName(modName);
				equal(modB.get('name'), modName, 'Properly returns module by name : ' + modB.get('name'));

				var modPath = testModules[1].path;
				var modC = Modules.getModuleByPath(modPath);
				equal(modC.get('path'), modPath, 'Properly returns module by path : ' + modC.get('path'));

				var testFunctionB = function (result) {
					console.log('testFunctionB', result);
				};
				var query = {name: modName, path: modPath};
				var modC = Modules.getModule(query, testFunctionB);
				console.log('modC', modC);
				ok(modC, 'Properly returns module with getModule and correct request : ' + modC.get('name'));
			});

/*
			test('Properly checks if a module exists', function () {
			});
*/

		}
	};
});