/** 
	* Backstrapp Module Class
*/
define([
	'jquery',
	'backbone',
	'core/facade',
	'backstrapp/content-builder',
	'backstrapp/module-activator',
	'base'
],
function ($, Backbone, f, builder, activator) {

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

			f.util.bindAll(this, 'render', 'publish', 'subscribe', 'loadView', 'activate', 'setHtml', 'createEvent', 'process', 'restore', 'hide', 'show', 'exports');

			this.loadSubscriptions(this.events);

			if (this.autoload === true) {
				this.subscribe('initComplete', this.start);
			}
			this.publish('initComplete');
			return this.exports();
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
				me.publish('processComplete', html);
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
			if (this.debug.publish) {
				console.log('PPPub', arguments);
			}
			var channel = this.name + f.util.camelize(event);
			f.publish(this.name, channel, params);
		},
		
		/*
			* @method subscribe
		*/
		subscribe: function (event, callback, context) {
			if (this.debug.subscribe) {
				console.log('SSSub', arguments);
			}
			var me = context || this.name;
			var channel = me + f.util.camelize(event);
			f.subscribe(this.name, channel, callback);
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
/* 			console.warn('msg', msg); */
			return msg;
		},
		
		util: {
			bindAll: f.util.bindAll
		}
	});

	return e;

});