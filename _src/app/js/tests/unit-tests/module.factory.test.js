define(['backstrapp/module.factory.0.1'], function (factory) {
	return {

		RunTests: function () {
			var el = $('<div id="testDom">Test Html</div>');

			module('Module Factory', {
				setup: function () {
				},
				teardown: function () {
				}
			});

			test('Properly Loads', function () {
				ok(factory, 'The Factory is Loaded!');
			});
			
			test('Returns Simple Module', function () {
				var f = new factory('simple', {msg: 'hello'});
				ok(f, 'something gets returned!');

				var isO = (typeof f == 'object') ? true : false;
				ok(isO, 'it is an object!');

				// TODO: find out why the module.model isn't getting set
				console.log('?', f, el);
				var mod = f.init(el);
				ok(mod, 'init returns something!');
			});
		}
	};
});