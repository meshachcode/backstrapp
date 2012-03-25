define(['../../core/permissions'], function (permissions) {
	return {

		RunTests: function () {
			var request = 'subscribe';
			var subscriber = 'testModule';
			var channel = 'testModuleInitComplete';

			module('Permissions', {
				setup: function () {
					permissions.mode.publish = true;
					permissions.mode.subscribe = true;
				},
				teardown: function () {
				}
			});

			test('Default Validation Rules Working Properly', function () {
				ok(permissions.validate(request, subscriber, channel), 
					'In default mode, all requests for modules to talk to themselves should pass');
				ok(!permissions.validate(request, 'X', channel), 
					'CANNOT validate a request for another module by default');
			});
			
			test('Quiet Mode.Subscribe Working Properly', function () {
				permissions.mode.subscribe = false;
				ok(!permissions.validate(request, subscriber, channel), 'CANNOT Subscribe if mode.Subscribe is false');
				ok(permissions.validate('publish', subscriber, channel), 'Publish still works if mode.Subscribe is false');
			});

			test('Quiet Mode.Publish Working Properly', function () {
				permissions.mode.publish = false;
				ok(!permissions.validate('publish', subscriber, channel), 'CANNOT Publish if mode.Publish is false');
				ok(permissions.validate(request, subscriber, channel), 'Subscribe still works if mode.Publish is false');
			});
		}
	};
});