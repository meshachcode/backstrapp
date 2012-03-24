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
			console.log('ModuleClass', config);
			// init the model here, so that it's a unique instance every time
			this.model = new ModuleModel(config);
			// This, effectively 'starts' your module. 
			// The params args are set by module.instance.init (module.face)
			this.model.bind('change:arg', this.processParams, this);
			this.model.bind('change:html', this.render, this);
		},

		render: function () {
			util.debug('render!!!');
			$(this.model.get('el')).html(this.model.get('html'));
		},
		
		processParams: function () {
			util.debug('processParams Not Set by Module Instance');
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