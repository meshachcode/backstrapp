define(['backstrapp/modules/jquibs.module.factory.0.1'], function (factory) {
	return {

		RunTests: function () {
			var message = {};
			var testObj = {};
			var el = $('<div id="testDom">El Html</div>');

			module('Module Factory: Message Module', {
				setup: function () {
					testObj = {msg: 'test', el: el, html: 'testObj Html', template:'path/to/some/template.html'};
					message = new factory('message', testObj);
					ok(factory, 'The Factory is Loaded!');
				},
				teardown: function () {
				}
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
					equal(messagei.get(i), testObj[i], 'Properly sets ' + i + ' to : ' + messagei.get(i));
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
				var testO = {testParam: 'testValue'};
				var messagei = message.init({arg: testO});
				equal(messagei.get('msg'), testObj.msg, 'Properly sets msg to: ' + messagei.get('msg'));
				equal(messagei.get('el'), testObj.el, 'Properly sets el to: ' + messagei.get('el'));
				equal(messagei.get('testParam'), testO.testParam, 'Properly sets params via init.arg : ' + messagei.get('testParam'));
/* 				
				TODO: make this testable by surfacing the defaultHTML method to the module somehow (maybe through get?)
				equal(messagei.get('html'), testObj.msg, 'Properly sets html to value of msg, since there is no template being set: ' + messagei.get('msg')); */
			});

			test('Properly saves state object', function () {
				var saved = message.save();
				ok(saved, 'Returns something!');
				equal(saved.html, testObj.html, 'Returns proper HTML val on save : ' + saved.html);
			});

			test('Properly restores with given state object', function () {
				var tO = {testVar: 'someVal'};
				var messagei = message.init(tO);
				equal(messagei.get('testVar'), tO.testVar, 'Properly sets config obj: ' + messagei.get('testVar'));
				
				var tOB = {testVar: 'anotherVal'};
				var messageiB = messagei.restore(tOB);
				equal(messageiB.get('testVar'), tOB.testVar, 'Properly restores with config obj: ' + messageiB.get('testVar'));
				
				var saved = message.save();
				saved.testVar = 'valC';
				saved.name = 'someName';
				var messageiC = message.restore(saved);
				equal(messageiC.get('testVar'), saved.testVar, 'Properly returns testVar val : ' + messageiC.get('testVar'));
				equal(messageiC.get('name'), saved.name, 'Properly returns name val : ' + messageiC.get('name'));
			});

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
					equal(messagei.get(i), testObj[i], 'Properly sets ' + i + ' to : ' + messagei.get(i));
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