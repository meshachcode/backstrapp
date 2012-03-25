/*
	* Module Class 0.4
		* core functionality
		* communication with Facade
		* TODO: Needs to communicate with the facade.
		* TODO: UNIT TEST THIS MOFO!!!!
*/
define(['util', 'backbone', '../models/module.model.0.1'], function (util, Backbone, ModuleModel) {
	
	var ModuleClass = Backbone.View.extend({

		initialize: function (config) {
			this.bindAll(this, 'activate', 'render', 'processParams');
			// init the model here, so that it's a unique instance every time
			this.model = new ModuleModel(config);
			// This, effectively 'starts' your module.
			// The params args are set by module.instance.init (module.face)
			this.model.bind('change:arg', this.processParams, this);
			this.model.bind('change:html', this.render, this);
		},

		render: function () {
/* 			util.debug('render!!!'); */
			if (this.model.get('isValid')) {
				$(this.model.get('el')).hide();
				$(this.model.get('el')).html(this.model.get('html'));
				$(this.model.get('el')).show('slow', this.activate);
			} else {
				var error = "Could not render because module is invalid!";
				$(this.model.get('el')).html(error);
			}
		},
		
		processParams: function () {
			util.debug('processParams Not Set by Module Instance');
		},
		
		activate: function () {
			this.model.set({isVisible: true, isActive: true});
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