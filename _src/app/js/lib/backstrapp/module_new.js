/** 
	* Backstrapp Module Class
*/
define([
	'backbone',
	'core/facade',
	'util/content-builder',
	'util/module-activator',
	'util/base'
],
function (Backbone, f, builder, activator) {

	var e = Base.extend({
		isValid			: 	false,
		isActive		:	false,
		autoload		:	false,
		name			:	'backstrappModule',
		html			: 	'',
		view			: 	'',
		el 				:	$('#content'),
		errors			:	[],
		exports			:	{},
		events			:	{},
		defaultEvents	: 	function () {
			return {
				initComplete		: '',
				startComplete		: '',
				stopComplete		: '',
				loadReady			: '',
				loadViewComplete	: '',
				processComplete 	: '',
				activateComplete	: '',
				viewReady			: '',
				setHtmlComplete		: '',
				renderComplete		: '',
				routeComplete		: ''
			}
		},

		/*
			* @method constructor
		*/
		constructor: function (obj) {
			f.util.bindAll(this, 'render', 'publish', 'subscribe', 'loadView', 'activate', 'setHtml', 'createEvent', 'initEvents', 'process');
			this.set(obj);
		},

		/*
			* @method init
		*/
		_init: function (item, params) {
			var n, name, me;
			me = this;
			// set this.name
			n = $(item).attr('id');
			name = this.set({ name: n, el: item }).name;
			console.log(this.name);
			return this.initEvents(this.name);
		},

		initEvents: function(name) {
			events = new this.defaultEvents();
			for ( var i in events ) {
				events[i] = name + f.util.camelize(i);
			}
			this.events = events;
			if (this.autoload === true) {
				console.log('subscribing initComplete to start');
				this.subscribe(this.name, this.events.initComplete, this.start);
			}
			this.publish(this.name, this.events.initComplete);
			return this.exports;
		},

		/*
			* @method start
		*/
		start: function (params) {
			this.set({
				isActive: true
			});
			this.publish(this.name, this.events.startComplete, params);
		},

		/*
			* @method stop
		*/
		stop: function () {
			this.set({
				isActive: false
			});
			this.publish(this.name, this.events.stopComplete, params);
		},

		/*
			* @method get
		*/
		get: function (k) {
			if (this[k] != undefined) {
				if (f.util.isFunction(e[k])) {
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
			* @method loadView
		*/
		loadView: function () {
			var me = this;
			this.loadHtml(this.view, function (html) {
				me.publish(me.name, me.events.loadViewComplete, html);
			});
		},

		/*
			* @method loadHtml
		*/
		loadHtml: function (source, callback) {
			f.require('text', source, callback);
		},

		/*
			* @method loadJson
		*/
		loadJson: function (source, callback) {
			f.require('json', source, callback);
		},

		/*
			* @method process
		*/
		process: function (html) {
			var me = this;
			this.processTemplate(html, this.exports, function (html) {
				me.publish(me.name, me.events.processComplete, html);
			});
		},
		

		/*
			* @method processTemplate
			* this is where you populate the template with any data
		*/
		processTemplate: function (html, data, callback) {
			f.processTemplate(html, data, callback);
		},
		
		/*
			* @method setHtml
			* 
		*/
		setHtml: function (h) {
			console.log('setHtml', this.name, arguments);
			this.set({ html: h });
			this.publish(this.name, this.events.setHtmlComplete);
		},

		/*
			* @method render
			* takes el and html params to allow for rendering small sections if needed
		*/
		render: function (el, html) {
			console.log(this.name, 'render!', this.page);
			var e = el || this.el;
			var h = html || this.html;
			if (this.isValid) {
				$(e).html(h);
			    builder.execute(e);
			    activator.execute(e);
			} else {
				this.errors.push('isValid = ' + this.isValid);
				var eMsg = this.printErrors(this.errors);
				$(el).html(eMsg);
			}
			this.publish(this.name, this.events.renderComplete, this.page);
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
			this.publish(this.name, this.events.destroyComplete);
		},

		/*
			* @method restore
			* 
		*/
		restore: function () {
			this.set({
				isValid: true
			});
			this.publish(this.name, this.events.restoreComplete);
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
			this.set({
				isValid: true,
				isActive: true
			});
			this.publish(this.name, this.events.activateComplete);
		},
		
		/*
			* @method save
			* NOT USED YET
		*/
		save: function () {
			this.publish(this.name, this.events.saveComplete);
		},
		
		/*
			* @method publish
		*/
		publish: function (name, event, params) {
			console.log('PPPub', arguments);
			f.publish(name, event, params);
		},
		
		/*
			* @method subscribe
		*/
		subscribe: function (name, event, callback) {
			console.log('SSSub', arguments);
			f.subscribe(name, event, callback);
		},

		/*
			* @method createEvent
		*/
		createEvent: function (v, k) {
			var event = this.name + f.util.camelize(k);
			this.events[k] = event;
		},
		
		/*
			* @method newEvent
			* this is used when a module needs to 'listen' to the event of another module
			* example: navModule needs to listen to pageModulePageReady, not navModulePageModulePageReady
		*/
		newEvent: function (e) {
			this.events[e] = e;
		},

		/*
			* @method printErrors
		*/
		printErrors: function (arr) {
			var msg;
			f.util.each(arr, function(err) {
				msg += "ERROR: " + err + "<br />";
			});
			console.warn('msg', msg);
			return msg;
		}
	});

	return e;

	});