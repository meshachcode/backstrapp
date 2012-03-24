/** 
	* Backstrapp Module Class

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
define([
	'jquery',
	'core/facade',
	'../utils/content-builder',
	'../utils/module-activator',
	'base'
],
function ($, facade, builder, activator) {

	var e = Base.extend({
		isValid			: 	false,
		isActive		:	false,
		autoload		:	false,
		name			:	'backstrappModule',
		html			: 	'',
		view			: 	'',
		el 				:	$('#content'),
		errors			:	[],
		debug			:	{},
		animation		:	{
			time: 250
		},

		exports			:	function () {
			return {
				isActive: this.isActive,
				isValid: this.isValid,
				name: this.name
			}
		},

		/*
			* @method constructor
		*/
		constructor: function (request) {
			this.set({ name: request.name, el: request.dom });

			facade.util.bindAll(this, 'render', 'publish', 'subscribe', 'loadView', 'activate', 'setHtml', 'process', 'restore', 'hide', 'show', 'exports');

			this.loadSubscriptions(this.events);

			if (this.autoload === true) {
				this.subscribe('initComplete', this.start);
			}
			this.publish('initComplete');
		},

		/*
			* @method loadSubscriptions
		*/
		loadSubscriptions: function (events) {
			for (var i in events) {
				this.subscribe(i, this[events[i]]);
			}
		},

		/*
			* @method start
		*/
		start: function (params) {
			this.set({
				isActive: true
			});
			this.publish('startComplete', params);
		},

		/*
			* @method stop
		*/
		stop: function () {
			this.set({
				isActive: false
			});
			this.publish('stopComplete', params);
		},
		
		/*
			* @method get
		*/
		get: function (k) {
			if (this[k] != undefined) {
				if (facade.util.isFunction(e[k])) {
					return this[k]();
				} else {
					return this[k];
				}
			}
		},

		/*
			* @method set
		*/
		set: function (obj) {
			var i;
			for (i in obj) {
				this[i] = obj[i];
			}
			return obj;
		},
		
		/*
			* @method hide
		*/
		hide: function () {
			$(this.el).hide();
		},
				
		/*
			* @method show
		*/
		show: function (time) {
			$(this.el).fadeIn(time);
		},

		/*
			* @method loadView
		*/
		loadView: function () {
			var me = this;
			this.loadHtml(this.view, function (html) {
				me.publish('loadViewComplete', html);
			});
		},

		/*
			* @method loadHtml
		*/
		loadHtml: function (source, callback) {
			facade.require('text', source, callback);
		},

		/*
			* @method loadJson
		*/
		loadJson: function (source, callback) {
			facade.require('json', source, callback);
		},

		/*
			* @method process
		*/
		process: function (html) {
			var me = this;
			this.processTemplate(html, this.exports, function (html) {
				me.publish('processComplete', html);
			});
		},
		

		/*
			* @method processTemplate
			* this is where you populate the template with any data
		*/
		processTemplate: function (html, data, callback) {
			facade.processTemplate(html, data, callback);
		},
		
		/*
			* @method setHtml
			* 
		*/
		setHtml: function (h) {
			if (this.debug.setHtml) {
				console.log('setHtml', this.name, arguments);
			}
			this.set({ html: h });
			this.publish('setHtmlComplete', h);
		},

		/*
			* @method render
			* takes el and html params to allow for rendering small sections if needed
		*/
		render: function (el, html) {
			var e = el || this.el;
			var h = html || this.html;
			if (this.debug.render) {
				console.log(this.name, 'render!', e, h, this);
			}
			if (this.isValid) {
				$(e).html(h);
				if (this.debug.render) {
					console.log('e', e);
				}
			    builder.execute(e);
			    activator.execute(e);
			} else {
				this.errors.push('isValid = ' + this.isValid);
				var eMsg = this.printErrors(this.errors);
				$(el).html(eMsg);
			}
			this.publish('renderComplete', this.page);
		},

		/*
			* @method destroy
			* this should remove the module gracefully
		*/
		destroy: function () {
			this.set({
				isValid: false
			});
			this.el.html(this.name + 'destroyed');
			this.publish('destroyComplete');
		},

		/*
			* @method restore
			* 
		*/
		restore: function (request) {
			if (this.debug.restore) {
				console.log('restore', arguments);
			}
			this.set({
				isValid: true,
				isActive: true,
				el: $(request.dom)
			});
			this.publish('restoreComplete', request.arg);
		},
		
		/*
			* @method deactivate
			* 
		*/
		deactivate: function () {
			this.set({
				isValid: false,
				isActive: false
			});
		},

		/*
			* @method activate
			* 
		*/
		activate: function (h) {
/* 			console.log('activate', h); */
			this.set({
				isValid: true,
				isActive: true
			});
			this.publish('activateComplete');
		},
		
		/*
			* @method save
		*/
		save: function () {
			this.publish('saveComplete');
		},
		
		/*
			* @method publish
		*/
		publish: function (event, params) {
			var channel = this.name + facade.util.camelize(event);
			if (this.debug.publish) {
				console.log('PPPub', event, this.name, channel);
			}
			facade.publish(this.name, channel, params);
		},
		
		/*
			* @method subscribe
		*/
		subscribe: function (event, callback, context) {
			var me = context || this.name;
			var channel = me + facade.util.camelize(event);
			if (this.debug.subscribe) {
				console.log('SSSub', this.name, channel, context);
			}
			facade.subscribe(this.name, channel, callback, me);
		},

		/*
			* @method printErrors
		*/
		printErrors: function (arr) {
			var msg;
			facade.util.each(arr, function(err) {
				msg += "ERROR: " + err + "<br />";
			});
/* 			console.warn('msg', msg); */
			return msg;
		},
		
		util: {
			bindAll: facade.util.bindAll
		}
	});

	return e;

});