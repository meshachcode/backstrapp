define([
  'jQuery',
  'Underscore',
  'Backbone',
  'vendors/backstrapp/models/backstrapp.model'
], function($, _, Backbone, BackstrappModel){

	return Backbone.View.extend({
		el: $("#content"),
		model: new BackstrappModel({
			name: 'backstrapp',
			views: 	{
				static: {
					view		:		'static',
					instance	:		{}
				},
				template: {
					view		:		'template',
					instance	:		{}
				}
			}
		}),

		initialize: function () {
			debug.debug('BackstrappApplication Init');
			this.model.bind('change:current', this.changeHandler, this);
		},

		initViews: function () {
			var i, ret = {}, views;
			views = this.model.get('views');
			for (i in views) {
				var obj, view = views[i], defaults;
				defaults = {
					name: 	views[i].name,
					el:		this.el
				};
				view.instance = new this.viewClasses[i](defaults);
				ret[i] = view;
			}
			this.model.set({ views: ret });
		},

		changeHandler: function () {
			debug.debug(this.model.get('name') + '.changeHandler', this.model.get('current'));
		}
	});

});