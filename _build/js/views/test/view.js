define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	var TestView = Backbone.View.extend({
		initialize: function () {
			Vent.bind('currentapp:test', this.render, this);
			debug.debug('TestView.init()');
		}, 
		
		render: function () {
			debug.debug('TestView.render()');
		}
	});
	
	return new TestView();
	
});