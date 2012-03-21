define(['../../lib/backstrapp/modules/module.class.0.3', 'jsonLoad!unit-tests/moduleClass.module.config.json'], 

function (m, config) {
	return {
		RunTests: function () {
			config.dom = $(config.dom);
			module('ModuleClass');
			
			test('Initialized with proper request object', function () {
				var mod = new m({
					html: 'test'
				});
				console.log('mod', mod);
			});
			
/*

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
*/
		}
	}
});

/** 
	* Backstrapp Module Class
	
	
		rules:	
			1 - modules self-initiate
				*	var _private = {
				*		// ALL MOD-SPECIFIC CODE GOES HERE
				*	};
				*	var module = new ModuleClass({
				*		// ALL OVERRIDES OF PUBLIC METHODS GO HERE
				*		start: function () {
				*			this.base(_private.someVar);
				*		}
				*	});
				*	return module;

			2 - modules DO NOT self-configure
				*	WRONG: 
				*		var module = new ModuleClass({
				*			activeitem: 'someitem'
				*		});
				*	RIGHT: 
				*		var module = new ModuleClass({
				*			defaults: {
				*				activeitem: 'someitem'
				*			},
				*			// no need to write this function if it's all you need. It's being done already.
				*			// however, if you do override this method, 
				*				- trigger this.base(obj) to have the parent constructor fire, 
				*				- or this.base() to have the parent constructor ignore the request object (not recommended)
				*			constructor: function (obj) {
				*				this.activeitem = (obj.activeitem) ? obj.activeitem : this.defaults.activeitem;
				*			}
				*		});
				*	This allows for outside configuration, easy testing, and easy blending of objects pre-construct, 
				*	instead of having to override default objects in their entirety.
			3 - modules depend on 'facade' to pub/sub, but the parent object includes it, so reference "this.f" to use it if you must
			4 - modules NEVER touch global variables in any way. 
			5 - call this.base() if you override any of the following methods: 
					- get, set, start, stop, restore, show, hide
					
					
					
##		EXAMPLES
			
			- hello world...
								define(['backstrapp.module'], function (bsModule) {
									var module = new bsModule({
										html: 'hello world'
									});
									return module;
								});


			// modules
			mod.facade
				f.defaults: {
					autoload: true,
					name: '',
					el: '',
					html: '',
					view: '',
					animation: {},
					debug: {},
					errors: {},
					events: {}
				}
				f.init( {el, name, events, autoload, view} ) // initEvents(), return util.extend(f.defaults, obj)
				f.set( {obj} ) // return util.extend(f.defaults, obj)
				f.get( 'key' ) // return this[key]
				f.state: {
					valid: true,
					active: true,
					visible: true
				}
				f.show() // if f.state.all { render() }
				f.hide()

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