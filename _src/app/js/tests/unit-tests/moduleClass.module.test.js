define(['../../lib/backstrapp/modules/module.class.0.2', 'jsonLoad!unit-tests/moduleClass.module.config.json'], function (m, config) {

	return {

		RunTests: function () {
			config.dom = $(config.dom);
			module('ModuleClass');

			test('Module should be created by passing a request object', function () {
				var mod = new m(config);
				var exports = mod.exports();

				equal(mod.name, config.name, 'returned module has proper name');
				equal(mod.el, config.dom, 'returned module has proper el');

				ok(!exports.isValid, 'returned exports has proper isValid');
				ok(!exports.isActive, 'returned exports has proper isActive');
			});

/*
			test('Module should not be created with an invalid request object', function () {
				var req = config;
			});
*/
		}
	};
});