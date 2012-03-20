define(['../../lib/backstrapp/modules/module.class.0.2', 'jsonLoad!unit-tests/moduleClass.module.config.json'], function (m, config) {
	return {
		RunTests: function () {
			config.dom = $(config.dom);
			module('ModuleClass');
			
			test('Initialized with proper request object', function () {
			});

			test('CANNOT initialize with improper request object', function () {
			});

			test('Starts as expected when isValid and isActive', function () {
				// test that isActive gets set
				// test that start() gets called
			});

			test('Setting !isActive stops the module', function () {
				// test that isActive gets set
				// test that stop() gets called
			});
			
			test('Setting isValid enables access to exports', function () {
				// test that isValid gets set
			});
			
			test('Setting isVisible renders the module', function () {
				// test that isVisible gets set
				// test that render happens as expected
			});
		}
	}
);


/** 
	* Backstrapp Module Class

		props
			isValid
			isActive
			isVisible
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