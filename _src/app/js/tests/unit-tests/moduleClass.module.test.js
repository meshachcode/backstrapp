/*
	* Testing Module 0.3
*/
define(['../../lib/backstrapp/modules/module.0.3', 'jsonLoad!unit-tests/moduleClass.module.config.json'], 

function (m, config) {
	return {
		RunTests: function () {
			var testApp = {
				requestA: {name: 'AAAAAAA', html: 'hello world', el: $('<div id="testA"></div>')},
				requestB: {name: 'BBBBBBB', html: 'sneaky!', el: $('<div id="testA"></div>'), visible: false}
			};
			
			module('ModuleClass', {
				setup: function () {
					testApp.modA = new m(testApp.requestA);
					testApp.modB = new m(testApp.requestB);
				},
				teardown: function () {
					testApp.modA = new m(testApp.requestA);
					testApp.modB = new m(testApp.requestB);
				}
			});
			
			test('Simple Hello World', function (){
				var module = new m({ html: 'hello world' });
				equal(module.get('html'), 'hello world', 'module.html should be set');
				equal(module.get('el').html(), module.get('html'), 'module.el.html() should match ' + module.get('html'));
			});
			
			test('Proper Object Inheritence', function () {
				equal(testApp.modA.get('name'), testApp.requestA.name, 'modA.name should match testApp.requestA.name ' + testApp.modA.name);

				var modB = testApp.modA.restore(testApp.requestB);
				equal(modB.get('name'), testApp.requestB.name, 'modB.name should match testApp.requestB.name ' + modB.name);

				var modC = testApp.modA.restore();
				equal(modC.get('name'), testApp.requestB.name, 'modC.name should match testApp.requestB.name ' + modC.name);

				var modD = new m(testApp.requestA);
				equal(modD.get('name'), testApp.requestA.name, 'modD.name should match testApp.requestA.name ' + modD.name);
			});
			
			test('Autoload triggers render', function () {
				equal(testApp.modA.get('html'), testApp.requestA.html, 'modA should have proper html set ' + testApp.modA.html);
				equal(testApp.modA.get('el').html(), testApp.requestA.html, 'modA.el should have proper html value ' + testApp.modA.html);
			});
			
			test('Save allows for state management', function () {
				var saved = testApp.modA.save();
				// did all the passed params get set?
				for (var i in testApp.requestA) {
					equal(saved[i], testApp.requestA[i], 'modA.' + i + ' should match testApp.requestA.' + i + ' ' + saved[i]);
				}

				// are all the other params as expected?
				ok(saved.active, 'saved.active should be ' + saved.active);
				ok(saved.valid, 'saved.valid should be  ' + saved.valid);
				ok(saved.visible, 'saved.visible should be  ' + saved.visible);
				ok(saved.autoload, 'saved.autoload should be ' + saved.autoload);

				saved.autoload = false;
				var modB = testApp.modA.restore(saved);
				ok(!modB.get('autoload'), 'modB.autoload should be ' + modB.autoload);
				ok(modB.get('active'), 'modB.active should be ' + modB.active);
				ok(modB.get('valid'), 'modB.valid should be ' + modB.valid);
				ok(modB.get('visible'), 'modB.visible should be ' + modB.visible);
			});
			
			test('Render should check state before writing html', function () {
				equal(testApp.modB.get('el').html(), 'unrenderable : unrenderable due to visible having value of false', 'modB should not render because of visible being false');

				var modC = new m(testApp.requestA);
				modC.set({valid: false});
				modC.restore();
				equal(modC.get('el').html(), 'unrenderable : unrenderable due to valid having value of false', 'modC should not render because of valid being false');

				var modD = new m(testApp.requestA);
				modD.set({active: false});
				modD.restore();
				equal(modD.get('el').html(), 'unrenderable : unrenderable due to active having value of false', 'modD should not render because of active being false');
			});
		}
	}
});

/*
			nav
				f.update( {currentItem} )

			page
				f.update( {currentPage} ) // f.set( {view: currentPage} )

*/