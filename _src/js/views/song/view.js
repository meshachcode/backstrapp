define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	var SongView = Backbone.View.extend({
		initialize: function () {
			Vent.bind('currentapp:song', this.render, this);
			debug.debug('SongView.init()');
		}, 
		
		render: function () {
			debug.debug('SongView.render()');
		}
	});
	
	return new SongView();
	
});