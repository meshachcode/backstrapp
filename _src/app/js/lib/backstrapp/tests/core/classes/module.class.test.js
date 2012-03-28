define(['backstrapp/core/classes/module.class.0.5'], function (ModuleClass) {

	return {

		RunTests: function () {
			var facade = {};
			var request = {};
			var testFunction = function () {
				QUnit.start();
			};

			module('Core: ModuleClass', {
				setup: function () {
				},
				teardown: function () {
				}
			});
			
			test('Instantiation', function () {
				ok(ModuleClass, 'Properly returns something!');
				ok(typeof ModuleClass.extend == 'function', '.extend is available!');
				var mod = new ModuleClass();
				ok(mod, 'Properly Instantiates');
			});
		}
	};
});