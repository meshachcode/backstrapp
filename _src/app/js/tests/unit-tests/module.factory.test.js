define(['backstrapp/jquibs.module.factory.0.1'], function (factory) {
	return {

		RunTests: function () {
			var message = {};
			var testObj = {};
			var el = $('<div id="testDom">Test Html</div>');

			module('Module Factory: Message Module', {
				setup: function () {
					testObj = {msg: 'test', el: el, html: 'test Html', template:'path/to/some/template.html'};
					message = new factory('message', testObj);
				},
				teardown: function () {
				}
			});

			test('Properly Loads', function () {
				ok(factory, 'The Factory is Loaded!');
			});
			
			test('Properly sets/gets config object', function () {
				for (var i in testObj) {
					equal(message.get(i), testObj[i], 'Properly sets ' + i + ' to : ' + message.get(i));
				}
			});
			
			test('Properly inits', function () {
				var messagei = message.init({el: el});
				ok(messagei, 'init returns something!');
			});

			test('Properly sets/gets from public module', function () {
				var messagei = message.init({el: el});
				for (var i in testObj) {
					equal(messagei.model.get(i), testObj[i], 'Properly sets ' + i + ' to : ' + messagei.model.get(i));
				}
			});

			module('Module Factory: Message Module - w/ parameters - NO template', {
				setup: function () {
					testObj = {msg: 'test', el: el, html: 'test Html'};
					message = new factory('message', testObj);
				},
				teardown: function () {
				}
			});

			test('Properly runs processParams', function () {
				var messagei = message.init({arg: {testParam: 'testValue'}});
				equal(messagei.model.get('msg'), testObj.msg, 'Properly sets msg to: ' + messagei.model.get('msg'));
				equal(messagei.model.get('el'), testObj.el, 'Properly sets el to: ' + messagei.model.get('el'));
				equal(messagei.model.get('html'), testObj.msg, 'Properly sets html to value of msg, since there is no template being set: ' + messagei.model.get('msg'));
			});
			
			test('Properly overrides html with :msg if passed with args', function () {
				var msg = {msg: 'test'};
				var messagei = message.init({arg: msg});
				equal(messagei.model.get('html'), msg.msg, 'Properly sets HTML to ' + messagei.model.get('html'));
			});

/*
			test('Properly saves state object');
			test('Properly restores with given state object');
*/
			module('Module Factory: Message Module - with parameters - WITH template', {
				setup: function () {
					testObj = {msg: 'test', el: el, html: 'test Html', template:'assets/template.html'};
					message = new factory('message', testObj);
				},
				teardown: function () {
				}
			});

			test('Properly runs processParams', function () {
				var messagei = message.init({arg: testObj});
				for (var i in testObj) {
					equal(messagei.model.get(i), testObj[i], 'Properly sets ' + i + ' to : ' + messagei.model.get(i));
				}
			});
			
/*
			TODO: implement onError catch for template loading
			test('Properly attempts to load template if passed', function () {
			});
*/
		}
	};
});