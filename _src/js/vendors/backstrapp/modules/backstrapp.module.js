define([
	'vendors/backstrapp/models/backstrapp.model'
], function(BackstrappModel){

	BackstrappModule = Backbone.View.extend({
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
			debug.debug('BackstrappModule Init');
			this.model.bind('change:current', this.changeHandler, this);
			this.initViews();
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

	return BackstrappModule;
});