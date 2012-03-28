define(['backstrapp/backstrapp'], function (Backstrapp) {
	return {

		RunTests: function () {
			var request = 'subscribe';
			var subscriber = 'testModule';
			var channel = 'testModuleInitComplete';
			var permissions = {};

			module('Core: Permissions', {
				setup: function () {
					permissions = new Backstrapp.Permissions();
				},
				teardown: function () {
				}
			});

			test('Default Validation Rules Working Properly', function () {
				ok(permissions.validate(request, subscriber, channel), 
					'In default mode, all requests for modules to talk to themselves should pass');
				ok(!permissions.validate(request, 'invalidTestSubscriber', channel), 
					'CANNOT validate a request for another module by default');
			});
			
		}
	};
});