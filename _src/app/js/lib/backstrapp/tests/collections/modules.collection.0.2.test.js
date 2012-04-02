define(['backstrapp/collections/modules.collection.0.2'], 

function (ModulesCollection) {
	return {

		RunTests: function () {
			var Modules = {};
			var request = {};
			var testModules = [
				{ name: 'testModuleA', 	path: 'modules_js/jquibs/message'},
				{ name: 'testModuleB', 	path: 'modules_js/jquibs/message'},
				{ name: 'testModuleC', 	path: 'modules_js/jquibs/message'}
			];

			module('Core: ModulesCollection.0.2', {
				setup: function () {
					Modules = new ModulesCollection(testModules);
					request = {
						name: 'testModuleA',
						el: $('<div>Test Module</div>'),
						path: 'modules_js/jquibs/message'
					};
				}
			});

			test('init complets', function () {
				ok(Modules, 'returns Object!');
				deepEqual(Modules.toJSON(), testModules, 'Properly sets default modules');
			});
			
/*
			asyncTest('Properly returns a module if not previously loaded', function () {
				// loadModule takes the request object, and calls the callback
				var tma = Modules.getModule(request);
			});
*/
/*
			test('Properly checks if a module is loaded', function () {
				var instanceName = Modules.buildModuleInstanceName(testModules[0].path, testModules[0].name);
				var result = Modules.isModuleLoaded(instanceName);
				ok(result, 'Properly returns success object for previously loaded module');

				var instanceName = Modules.buildModuleInstanceName(request.path, request.name);
				var result = Modules.isModuleLoaded(request);
				ok(!result, 'CANNOT verify unloaded module : ' + result);
			});
			
			test('Properly loads module when added to the collection', function () {
				var testFunctionB = function (result) {
					console.log('Modules Collection testFunctionB', arguments);
					ok(result.success, 'Properly triggers newModuleLoaded with success object : ' + result.success);
				}
				Modules.bind('newModuleLoaded', testFunctionB);
 				Modules.add(request);
			});
*/

		}
	};
});