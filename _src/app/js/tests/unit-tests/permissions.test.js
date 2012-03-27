define(['backstrapp/core/permissions'], function (permissions) {
	return {

		RunTests: function () {
			var request = 'subscribe';
			var subscriber = 'testModule';
			var channel = 'testModuleInitComplete';

			module('Core: Permissions', {
				setup: function () {
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