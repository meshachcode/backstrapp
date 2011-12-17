define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var SongView = Backbone.View.extend({
		initialize: function () {
			debug.debug('SongView.init()');
		}
	});
	
	return new SongView();
	
});