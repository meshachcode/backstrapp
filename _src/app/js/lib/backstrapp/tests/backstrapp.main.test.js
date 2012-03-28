define(['backstrapp/backstrapp'], function (Backstrapp) {
	return {

		RunTests: function () {
			var b$ = {};

			module('Backstrapp: Main', {
				setup: function () {
					b$ = new Backstrapp();
					ok(b$, 'Backstrapp is Defined!');
				},
				teardown: function () {
					b$ = {};
				}
			});

			test('Properly Instantiates', function () {
				ok(!b$.config.debugMode, 'Properly sets debugMode to ' + b$.config.debugMode + ' by default');
				ok(b$.Util, 'Properly loads Util');
				var f = new b$.Facade();
				ok(f, 'Properly instantiates new Facade');
				var m = new b$.Mediator();
				ok(m, 'Properly instantiates new Mediator');
				var p = new b$.Permissions();
				ok(p, 'Properly instantiates new Permissions');
			});
		}
	};
});