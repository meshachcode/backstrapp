define(['../../modules/dev/module.0.3', 'jsonLoad!unit-tests/moduleClass.module.config.json'], 

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
				equal(module.html, 'hello world', 'module.html should be set');
				equal(module.el.html(), 'hello world', 'module.el.html() should match ' + module.html);
			});
			
			test('Proper Object Inheritence', function () {
				equal(testApp.modA.name, testApp.requestA.name, 'modA.name should match testApp.requestA.name ' + testApp.modA.name);

				var modB = testApp.modA.restore(testApp.requestB);
				equal(modB.name, testApp.requestB.name, 'modB.name should match testApp.requestB.name ' + modB.name);

				var modC = testApp.modA.restore();
				equal(modC.name, testApp.requestB.name, 'modC.name should match testApp.requestB.name ' + modC.name);

				var modD = new m(testApp.requestA);
				equal(modD.name, testApp.requestA.name, 'modD.name should match testApp.requestA.name ' + modD.name);
			});
			
			test('Autoload triggers render', function () {
				equal(testApp.modA.html, testApp.requestA.html, 'modA should have proper html set ' + testApp.modA.html);
				equal(testApp.modA.el.html(), testApp.requestA.html, 'modA.el should have proper html value ' + testApp.modA.html);
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
				ok(!modB.autoload, 'modB.autoload should be ' + modB.autoload);
				ok(modB.active, 'modB.active should be ' + modB.active);
				ok(modB.valid, 'modB.valid should be ' + modB.valid);
				ok(modB.visible, 'modB.visible should be ' + modB.visible);
			});
			
			test('Render should check state before writing html', function () {
				equal(testApp.modB.el.html(), 'unrenderable : unrenderable due to visible having value of false', 'modB should not render because of visible being false');

				var modC = new m(testApp.requestA);
				modC.set({valid: false});
				modC.restore();
				equal(modC.el.html(), 'unrenderable : unrenderable due to valid having value of false', 'modC should not render because of valid being false');

				var modD = new m(testApp.requestA);
				modD.set({active: false});
				modD.restore();
				equal(modD.el.html(), 'unrenderable : unrenderable due to active having value of false', 'modD should not render because of active being false');
			});
		}
	}
});

/** 
	* Backstrapp Module Class


			mod.mediator
				m

			nav
				f.update( {currentItem} )

			page
				f.update( {currentPage} ) // f.set( {view: currentPage} )

			hero
			ticker
			
			// core
			facade
			mediator
			permissions




		props
			isValid
				// true: (data is good, dom is accessible, facade is communicative)
				// false: (for any of the above reasons)
					// - {errors} object should contain explanation
					// - render() should load error view if available
					// - 
			isActive
			isVisible
				// true: 
					// - show() renders the current view
					// - 
			autoload
			name
			html
			view
			el
			animation
			debug
			errors

		constructor: function (request) {},
		loadSubscriptions: function (events) {},
		start: function (params) {},
		stop: function () {},
		get: function (k) {},
		set: function (obj) {},
		hide: function () {},
		show: function (time) {},
		loadView: function () {},
		loadHtml: function (source, callback) {},
		loadJson: function (source, callback) {},
		process: function (html) {},
		processTemplate: function (html, data, callback) {},
		setHtml: function (h) {},
		render: function (el, html) {},
		destroy: function () {},
		restore: function (request) {},
		deactivate: function () {},
		activate: function (h) {},
		save: function () {},
		publish: function (event, params) {},
		subscribe: function (event, callback, context) {},
		printErrors: function (arr) {},
		util: {
			bindAll: facade.util.bindAll
		}






	TODO: refactor the ModuleClass object with pub/priv in mind. THINK TDD!!!
			- NOTE: public properties
						autoload, errors, 
					public methods
						get
						set
							(isActive, isValid, isVisible)
						start
						stop
						render
						restore
						destroy
						subscribe
						publish
						save
	
		- EITHER: construct an exports object by the following method
				- establish exports as an object instead of the current function
					- the exports object should describe all of the keys it will allow, with default values
				- in the constructor, create a binding to all pub events, and pass them to an exportBuilder()
				- exportBuilder checks the event against the exports object, and only updates values where a key already exists
				- methods which should return the exports object: init, start, render, restore, start, stop, get, set, activate

		- OR: split the module class into it's own facade/mediator pattern
				- facade (the frontal lobe)
					- get
					- set
						- isActive, isValid, isVisible, etc...
						- set listeners on each of these changing, and you'll be able to 
						  handle TONS of functionality behind the scenes.
							  EXAMPLE: isActive is toggled to true, so get data, parse it, and set isVisible to render
							  EXAMPLE: isActive is toggled to false, so set isVisible to false
							  EXAMPLE: isValid is toggled to true, so ...?
							  EXAMPLE: isValid is toggled to false, so log errors and show an error view
							  EXAMPLE: isVisible is toggled true, so 
					- start
						- set(isActive)
					- stop
						- set(!isActive)
				- mediator (the reptilian brain)
					- data modeling
					- everything else
*/