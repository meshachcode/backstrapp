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

			module('Core: ModulesCollection', {
				setup: function () {
					Modules = new ModulesCollection();
					Modules.reset(testModules);
					request = {
						name: 'testModuleA',
						el: $('<div>Test Module</div>'),
						path: 'modules_js/jquibs/message'
/* 						arg: {} */
					};
					ok(Modules, 'returns Object!');
					deepEqual(Modules.toJSON(), testModules, 'Properly sets default modules (not yet loaded, though)');
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
				request.instanceName = Modules.buildModuleInstanceName(testModules[0].path, testModules[0].name);
				// loadModule takes the request object, and calls the callback
				Modules.loadModule(request, testFunction);
			});

			test('Properly checks if a module is loaded', function () {
				var instanceName = Modules.buildModuleInstanceName(testModules[0].path, testModules[0].name);
				var result = Modules.isModuleLoaded(instanceName);
				ok(result, 'Properly returns success object for previously loaded module');

				var instanceName = Modules.buildModuleInstanceName(request.path, request.name);
				var result = Modules.isModuleLoaded(request);
				ok(!result, 'CANNOT verify unloaded module : ' + result);
			});
			
/*
			test('Properly loads module when added to the collection', function () {
				var testFunctionB = function () {
					console.log('Modules Collection testFunctionB', arguments);
				}
				Facade.subscribe('modulesCollection', 'modulesCollectionNewModule', testFunctionB);
 				Modules.add(request);
			});
*/

		}
	};
});