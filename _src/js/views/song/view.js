define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){

	var SongView = Backbone.View.extend({
		el: $('#content'),

		initialize: function () {
			Vent.bind('currentapp:song', this.render, this);
			debug.debug('SongView.init()');
		}, 
		
		render: function () {
			debug.debug('SongView.render()');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				debug.debug('animation over');
				me.el.html('SONG');
				me.el.parent().fadeIn(400);
			});
		}
	});
	
	return new SongView();
	
});