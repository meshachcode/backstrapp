define(['core/facade'], function (f) {
	return {

		RunTests: function () {
			var testObj = {};

			module('Core: Facade', {
				setup: function () {
					testObj = { test: true };
				},
				teardown: function () {
				}
			});
			
			test('Properly Instantiates', function () {
				ok(f, 'returns something!');
				ok(f.util.isFunction(f.publish), 'publish is a function!');
				ok(f.util.isFunction(f.subscribe), 'subscribe is a function!');
			});

/*
			test('', function () {
				
			});
*/
		}
	};
});