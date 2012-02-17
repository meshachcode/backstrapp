define([
  'jQuery',
  'Underscore',
  'Backbone',
  'libs/backstrapp/models/backstrapp.model'
], function($, _, Backbone, BackstrappModel){

	BackstrappModule = Backbone.View.extend({
		model: new BackstrappModel({ name: 'backstrapp' }),

		initialize: function () {
			var name = this.model.get('name');
			debug.debug('Backstrapp.Module init', name);
			this.model.bind('change:current', this.changeHandler, this);
		},

		changeHandler: function () {
			debug.debug('changed', this.model.get('current'));
		}
	});

	return BackstrappModule;
});