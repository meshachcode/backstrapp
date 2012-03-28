define(['backstrapp/backstrapp'], function (Backstrapp) {
	return {

		RunTests: function () {
			module('Core: App', {
				setup: function () {
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates with provided config', function () {
				// either of these should work
				var app = new Backstrapp.App();
				ok(!app.get('debugMode'), 'Debug Mode is false by default');
				ok(app, 'new app returns something!');
				app.set({debugMode: true});
				ok(app.get('debugMode'), 'Debug Mode is true after being set');

				// or...
				var appB = new Backstrapp.App({debugMode: true});
				ok(appB.get('debugMode'), 'Debug Mode is true after being set');
			});
			
			test('Properly starts app on command', function () {
				var app = new Backstrapp.App();
				var a = app.start();
				ok(a.success, 'Properly starts app : ' + a.success);
				ok(a.app.starts, 'Properly begins starts and restarts count : ' + a.app.starts);
				var b = app.start();
				ok(b.success, 'Properly REstarts app : ' + b.success);
				ok(b.app.starts, 'Properly counts restarts : ' + b.app.starts);
			});
			
/* 			test('Properly ...'); */
		}
	};
});