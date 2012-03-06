/** 
	* Backstrapp Module Class
*/
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
		renderEvent		:	'renderModule',
		routerEvent		:	'routerModule',
		el 				:	$('#content'),
		html			:	'loading',
		template		: 	'default.html',
		isValid			: 	false,
		errors			:	[],
		
		/*
			* @method constructor
			* _bindAll() outside of init to avoid init be overridden 
			* and breaking the parent class
		*/
		constructor: function () {
			_.bindAll(this, 'render', 'validate', 'publish');
		},

		/*
			* @method get
			* notice this either returns a property 
			* OR triggers a function. 
			* This should use call() and degrade gracefully, 
			* but it does the trick for now.
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
			* @method init
			* @return Object this.exports
			* setup the renderEvent based on the Module Name (it's here to ensure the name has been properly set first) 
				NOTE: using the aura mediator here. (m.util.camelize)
				Maybe this should be the maestro facade, 
				and let the maestro/mediator extend aura/mediator? 
			* subscribe to a custom event with with :
				* module's name (generated by the div ID), 
				* renderEvent (renderModuleName),
				* callback method (this.render)
			* process the params to see if there are further actions to be taken
		*/
		init: function(params) {
			this.renderEvent = 'render' + m.util.camelize(this.name); 
			f.subscribe(this.name, this.renderEvent, this.render);

			this.routerEvent = 'router' + m.util.camelize(this.name); 
			f.subscribe(this.name, this.routerEvent, this.render);

			if (!_.isUndefined(params) && !_.isNull(params)) {
				this.utils.processParams(params, this.validate);
			}
			return this.exports();
		},

		/*
			* @method validation
			* this doesn't really do anything yet, but the idea is that we'd
			* do some kind of check to make sure the module is ready to load.
			* right now, it's looking for param.template to be set in order to 
			* publish. that's a problem, 'cause some modules do not need the
			* template param to be set.
		*/
		validate: function (param) {
			if (param.template) {
				this.utils.loadView(param.template, this.publish, this);
			} else {
				this.set({ isValid: true });
				this.publish(this.name, this.renderEvent, this.render);
			}
		},
		
		/*
			* @method publish
			* sets the values for html and isValid
			* fires a publish event with:
				* module name, 
				* renderEvent, 
				* export object 
					* ({ isValid:true, data: { module-specific data object }, errors: [ array of error objects ]}})
		*/
		publish: function (response) {
			this.set({ 
				html: response,
				isValid: true
			});
			var ex = this.exports();
			f.publish(this.name, this.renderEvent, ex);
		},
		
		/*
			* @method render
			* this probably isn't the right place to check for errors.
			* I wrote it with the 'Message' module in mind, which will display it's own errors. 
			*
			* However, if you want your module to only call 'render' when it's valid, 
			* simply update the validation method above.
			*
			* If you don't want your render method to print it's errors to screen, then you may wanna
			* override this method in your module instance.
		*/
		render: function () {
			if (this.isValid) {
				$(this.el).html(this.html);
			    builder.execute(this.el);
			    activator.execute(this.el);
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
		},
		
		/*
			* @method exports
			* @returns Object
		*/
		exports: function () {
			return {
				isValid: 	this.get('isValid'),
				errors: 	this.get('errors'),
				data:		this.get('data')
			}
		}
	});
		
	return e;

});