define([
  'jQuery',
  'Underscore',
  'Backbone',
  'modules/data/data.module',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){

	/**
		* @class AppModel
		* @extends Backbone.Model
	*/
	var AppModel = Backbone.Model.extend({

		/**
			* @method findPage
		*/
		findPage: function () {
			var page;
			if ( page = DataModel.itemExists(DataModel.get('requestedPage'), DataModel.get('data').pages) ) {
				DataModel.set({ currentPage: page });
				Vent.trigger('pagetype:' + page.type);
			} else {
				Vent.trigger('navigate:home');
			}
		},

		/**
			* @method loadData
		*/
		loadData: function () {
			DataModel.loadData(DataModel.get('file'), function (json) {
				var pages;
				pages = DataModel.get('pages');
				for ( i in pages ) {
					json.pages.push(pages[i]);
				}
				DataModel.set({data: json});
			})
		},

		/**
			* @method loadPage
		*/
		loadPage: function () {
			$.get(DataModel.get('currentPage').file, function (html) {
				DataModel.set({pageHtml: html});
				Vent.trigger('render:page')
			});
		}
		
	});
	
	return new AppModel();
});