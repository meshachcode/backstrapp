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
		template		: 	'',
		el 				:	$('#content'),
		errors			:	[],
		exports			:	{},
		events			:	{
			initComplete	: '',
			startComplete	: '',
			stopComplete	: '',
			loadReady		: '',
			processComplete : '',
			renderReady		: '',
			renderComplete	: '',
			routeComplete	: ''
		},
		
		/*
			* @method constructor
		*/
		constructor: function (obj) {
			f.util.bindAll(this, 
				'start', 
				'stop', 
				'process', 
				'render', 
				'activate', 
				'deactivate', 
				'loadHtml', 
				'setHtml',
				'initEvents', 
				'createEvent'
			);
			this.set(obj);
		},

		/*
			* @method init
		*/
		init: function (item, params) {
			// set this.name
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.initEvents();
			this.publish('initComplete', params);
			return this.exports;
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
		},

		/*
			* @method load
		*/
		load: function () {
			this.loadHtml(this.template, this.process);
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
			this.processTemplate(html, this.exports, this.activate);
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
			this.set({ html: h });
			this.publish('renderReady');
		},

		/*
			* @method render
			* takes el and html params to allow for rendering small sections if needed
		*/
		render: function (el, html) {
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
			this.publish('renderComplete');
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
		restore: function () {
			this.set({
				isValid: true
			});
			this.publish('restoreComplete');
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
			this.setHtml(h);
		},
		
		/*
			* @method save
			* NOT USED YET
		*/
		save: function () {
			this.publish('saveComplete');
		},
		
		/*
			* @method publish
		*/
		publish: function (event, params) {
			f.publish(this.name, this.events[event], params);
		},
		
		/*
			* @method subscribe
		*/
		subscribe: function (event, callback) {
			f.subscribe(this.name, this.events[event], callback);
		},

		/*
			* @method initEvents
			* loops through the events array and generates custom events which include the module name
		*/
		initEvents: function () {
			// set all events
			f.util.each(this.events, this.createEvent);
			if (this.autoload) {
				this.subscribe('initComplete', this.start);
			}
			this.subscribe('loadReady', this.load);
			this.subscribe('renderReady', this.render);
		},

		/*
			* @method createEvent
		*/
		createEvent: function (v, k, context) {
			var event = this.name + f.util.camelize(k);
			context[k] = event;
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