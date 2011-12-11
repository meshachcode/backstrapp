define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	var AppView = Backbone.View.extend({
		initialize: function () {
			debug.debug('AppView.init()');
		}
	});

	return AppView;

});