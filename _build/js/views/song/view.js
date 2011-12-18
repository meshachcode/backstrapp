define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent',
  'text!templates/song/view.html'
], function($, _, Backbone, DataModel, Vent, SongHtml){

	var SongView = Backbone.View.extend({
		el: $('#content'),
		pageData: {
			"url"		:	"song",
			"title"		:	"Song",
			"type"		:	"app",
			"visible"	:	true
		},

		initialize: function () {
			Vent.bind('currentapp:song', this.render, this);
			debug.debug('SongView.init()');
//			DataModel.set({ newpage: this.pageData });
		}, 
		
		render: function () {
			debug.debug('SongView.render()');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				debug.debug('animation over');
				me.el.html(SongHtml);
				me.el.parent().fadeIn(400);
			});
		}

	});
	
	return new SongView();
	
});