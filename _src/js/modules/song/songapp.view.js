/**
	* The song view does nothing...
	* @module SongView
	* @requires $, _, Backbone, DataModel, Vent, SongHtml
*/
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data.model',
  'events/vent',
  'text!templates/song/view.html'
], function($, _, Backbone, DataModel, Vent, SongHtml){

	/**
		* @class SongView
		* @extends Backbone.View
	*/
	var SongView = Backbone.View.extend({

		/**
			* @property pageData
		*/
		pageData: {
			"url"		:	"song",
			"title"		:	"Song",
			"type"		:	"app",
			"name"		:	"song",
			"visible"	:	true
		},

		/**
			* @method initialize
		*/
		initialize: function () {
			Vent.bind('currentapp:song', this.render, this);
			DataModel.set({ newpage: this.pageData });
		}, 

		/**
			* @method render
		*/
		render: function () {
			debug.debug('SongView.render()');
			DataModel.set({ pageHtml: SongHtml });
		}
	});
	
	return new SongView();
	
});