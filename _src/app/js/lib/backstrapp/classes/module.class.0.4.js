/*
	* Module Class 0.4
		* core functionality
		* communication with Facade
		* TODO: Needs to communicate with the facade.
		* TODO: UNIT TEST THIS MOFO!!!!
*/
define(['util', 'core/facade', 'backbone', '../models/module.model.0.1'], function (util, Facade, Backbone, ModuleModel) {
	
	var ModuleClass = Backbone.View.extend({
		processable: [],
		processed: [],
		required: [],

		initialize: function (config) {
			this.bindAll(this, 'activate', 'render', 'processParams', 'setParams');
			this.f = new Facade();

			// init the model here, so that it's a unique instance every time
			this.model = new ModuleModel(config);
			this.model.bind('change:name', this.initComplete, this);

			// The params args are set by module.instance.init (module.face)
			this.model.bind('change:arg', this.processParams, this);
			this.model.bind('complete:params', this.setHtml, this);
			this.model.bind('change:html', this.render, this);
		},
		
		initComplete: function () {
			this.publish('InitComplete', this.model.toJSON());
		},

		render: function () {
			$(this.model.get('el')).hide();
			if (this.model.get('isValid')) {
				$(this.model.get('el')).html(this.model.get('html'));
			} else {
				var error = "Could not render because module is invalid!";
				$(this.model.get('el')).html(error);
			}
			$(this.model.get('el')).show('slow', this.activate);
			console.log('##### render', this.model.get('html'), this.model.get('el').html());
		},
		
		/*
			* @method processParams
			* receives data-module-parameters as 2nd argument (objectified by activator)
			* the object here has already passed model validation rules
			* TODO: 3 methods and a 3 arrays to handle params, really? There's gotta be a lighter-weight solution, no?
		*/
		processParams: function (o, paramObj) {
			console.log('processParams', arguments);
			this.processed = [];
			this.processable = Object.keys(paramObj);
			if (this.util.hasAllKeys(paramObj, this.required)) {
				this.processParamRules(paramObj, this.setParams);
			} else {
				this.model.set({html: 'ERROR: Missing required param. Required params: ' + this.required.join(',')});
			}
		},
		
		processParamRules: function (paramObj, callback) {
			// loop through paramObj, and see if you have any rules for them
			for (var i in paramObj) {
				this.processed.push(i);
				if (this.params[i]) {
					this.params[i].call(this, paramObj[i], callback);
				} else {
					callback(i, paramObj[i]);
				}
			}
		},

		/*
			* @method setParams
			* @param key
			* @param value
		*/
		setParams: function (k, v) {
			this.model.attributes[k] = v;
			var diff = this.util.difference(this.processable, this.processed);
			if (this.util.isEmpty(diff)) {
				this.model.trigger('complete:params');
			}
		},

		/*
			* @method setHtml
			* set model.html, based on the information available.
				- is there a template? 
					- if so, process it with the model
					- if not, pick a parameter, any parameter...?
			* TODO: Error handling for this stuff...
			If these tests fail, the module's el should print a debug statement in debug mode
		*/
		setHtml: function () {
			// prepend name here to make sure change:html gets triggered
			var html = this.model.defaultHtml();
			if (this.model.get('template') != this.model.defaults.template) {
				var o = this.model.toJSON();
				html = t.process(o, this.model.get('template'));
			}
			console.log('setting HTML', html, this.model.toJSON());
			this.model.set({html: html});
		},
		
		activate: function () {
			this.model.set({isVisible: true, isActive: true});
			this.publish('RenderComplete', this.model.toJSON());
		},
		
		publish: function (event, params) {
			console.log('publish', arguments);
			this.f.publish(this.model.get('name'), this.model.get('name') + event, params);
		},
		
		subscribe: function (event, callback) {
			this.f.publish(this.model.get('name'), this.model.get('name') + event, callback, this);
		},

		set: function (obj) {
			var viewData = this.model.get('viewData');
			util.extend(viewData, obj);
			this.model.set({viewData: viewData});
			return this.model.get('viewData');
		},

		get: function (str) {
			var viewData = this.model.get('viewData');
			return viewData[str];
		},
		
		bindAll: util.bindAll,
		util: util

	});

	return ModuleClass;

});