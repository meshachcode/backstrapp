define([
	'underscore', 
	'backbone', 
	'lib/aura/core/mediator', 
	'modules/maestro/facade', 
	'util/content-builder', 
	'util/module-activator', 
	'util/base'
],
function (_, Backbone, m, f, builder, activator) {

	var e = Base.extend({
		name			:	'Module',
		renderEvent		:	'Module',
		el 				:	$(),
		html			:	'loading',
		template		: 	'test',
		isValid			: 	false,
		errors			:	[],

		exports: function () {
			return {
				isValid: 	this.isValid,
				errors: 	this.errors,
				data:		this.data
			}
		},
		
		constructor: function () {
			_.bindAll(this, 'render', 'validation', 'publish');
		},

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

		init: function(params) {
			this.renderEvent = 'render' + m.util.camelize(this.name);
			f.subscribe(this.name, this.renderEvent, this.render);
			if (!_.isUndefined(params) && !_.isNull(params)) {
				this.utils.processParams(params, this.validation);
			}
	
			return this;
		},
			
		validation: function (param) {
			if (param.template) {
				this.utils.loadView(param.template, this.publish, this);
			}
		},
		
		publish: function (response) {
			this.set({ html: response });
			this.set({ isValid: true });
			var ex = this.get('exports');
			f.publish(this.name, this.renderEvent, ex);
		},
		
		render: function () {
			console.log('render!');
			if (this.isValid) {
				$(this.el).html(this.html);
			} else {
				var eMsg = this.printErrors();
				$(this.el).html(eMsg);
			}
		},
		
		utils: {
	
			processParams: function (params, callback) {
				var paramObj = this.objectifyParams(params);
				callback(paramObj);
			},
	
			objectifyParams: function (paramStr) {
				var pObj = {},
					pArr = [],
					iArr = [];
				pArr = paramStr.split(',');
				_.each(pArr, function (i) {
					iArr = i.split(':');
					pObj[iArr[0]] = iArr[1];
				});
				return pObj;
			},
		
			printErrors: function () {
				var msg;
				_.each(this.errors, function(e) {
					msg += "ERROR: " + e + "<br />";
				});
				return msg;
			},
	
			loadView: function (path, callback) {
				require(['text!' + path], function (response) {
					callback(response);
				});
			}				
		}
	});
		
	return e;

});