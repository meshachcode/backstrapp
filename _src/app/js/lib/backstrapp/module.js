/** 
	* Backstrapp Module Class
*/
define([
	'underscore',
	'backbone',
	'core/mediator',
	'core/facade',
	'util/content-builder',
	'util/module-activator',
	'util/base'
],
function (_, Backbone, m, f, builder, activator) {

	var e = Base.extend({
		name			:	'Module',
		el 				:	$('#content'),
		html			:	'loading',
		template		: 	'default.html',
		isValid			: 	false,
		errors			:	[],
		events			:	{
			renderReady 	: '',
			renderComplete 	: '',
			initComplete 	: '',
			loadReady		: '',
			routerEvent		: ''
		},
		
		/*
			* @method constructor
			* _bindAll() outside of init to avoid init be overridden 
			* and breaking the parent class
		*/
		constructor: function () {
			_.bindAll(this, 'render', 'publish', 'createEvent', 'start');
		},
		
		/*
			* @method init
			* @return Object this.exports
		*/
		init: function(item, params) {
			// create all the module's basic events
			_.each(this.events, this.createEvent);
			f.subscribe(this.name, this.events.renderReady, this.render);
			f.subscribe(this.name, this.events.initComplete, this.start);
			f.subscribe(this.name, this.events.loadReady, this.load);
			f.publish(this.name, this.events.initComplete, params);
			return this.exports();
		},
		
		load: function () {
			console.log('module.load');
			require(['text!' + this.template], this.process);
		},
		
		process: function () {
			console.log('module.process does not do anything');
		},
		
		start: function () {
			console.log('module start does not do anything');
		},

		createEvent: function (v, k) {
			var event = this.name + m.util.camelize(k);
			this.events[k] = event;
		},
		
		/*
			* @method get
		*/
		get: function (k) {
			if (this[k] != undefined) {
				if (_.isFunction(e[k])) {
					return this[k]();
				} else {
					return this[k];
				}
			}
		},

		set: function (obj) {
			var i;
			for (i in obj) {
				this[i] = obj[i];
			}
		},
		
		/*
			* @method publish
		*/
		publish: function (response, renderEvent) {
			this.set({ 
				html: response,
				isValid: true
			});
			var e = renderEvent || this.events.renderReady;
			f.publish(this.name, e);
		},
		
		/*
			* @method render
			* @param domEl Object DOM element
			* @param html String html
		*/
		render: function (domEl, html) {
			var el = domEl || this.el;
			var h = html || this.html;

			if (this.isValid) {
				$(el).html(h);
			    builder.execute(el);
			    activator.execute(el);
			} else {
				this.errors.push('isValid = ' + this.isValid);
				var eMsg = this.util.printErrors(this.errors);
				$(el).html(eMsg);
			}
			f.publish(this.name, this.events.renderComplete);
		},

		util: {
			printErrors: function (arr) {
				var msg;
				_.each(arr, function(err) {
					msg += "ERROR: " + err + "<br />";
				});
				console.warn('msg', msg);
				return msg;
			}
		},
		
		exports: function () {
			return {
				isValid: 	this.get('isValid'),
				errors: 	this.get('errors'),
				data:		this.get('data'),
				get: function (str) {
					return this.get(str);
				},
				set: function (obj) {
					return this.set(obj);
				}
			}
		}
	});
		
	return e;

});