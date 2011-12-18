define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent',
  'text!templates/song/view.html'
], function($, _, Backbone, DataModel, Vent, SongHtml){

	var SongView = Backbone.View.extend({

		pageData: {
			"url"		:	"song",
			"title"		:	"Song",
			"type"		:	"app",
			"name"		:	"song",
			"visible"	:	false
		},

		initialize: function () {
			Vent.bind('currentapp:song', this.render, this);
			debug.debug('SongView.init()');
			DataModel.set({ newpage: this.pageData });
		}, 
		
		render: function () {
			debug.debug('SongView.render()');
			DataModel.set({ pageHtml: SongHtml });
		}

	});
	
	return new SongView();
	
});