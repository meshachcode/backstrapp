define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data.model',
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
			debug.debug('AppModel.findPage()');
			debug.debug('DataModel.pages', DataModel.get('data').pages);
			var page;
			if ( page = DataModel.itemExists(DataModel.get('requestedPage'), DataModel.get('data').pages) ) {
				debug.debug('PAGE FOUND', page);
				DataModel.set({ currentPage: page });
				Vent.trigger('pagetype:' + page.type);
			} else {
				debug.debug('PAGE NOT FOUND');
				this.router.navigate('/home', true);
				Vent.trigger('navigate:home');
			}
		},

		/**
			* @method loadData
		*/
		loadData: function () {
			debug.debug('AppModel.loadData()');
			DataModel.loadData(DataModel.get('file'), function (json) {
				debug.debug('DataModel.pages', DataModel.get('pages'));
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
			debug.debug('AppModel.loadPage()');
			$.get(DataModel.get('currentPage').file, function (html) {
				debug.debug(html);
				DataModel.set({pageHtml: html});
				Vent.trigger('render:page')
			});
		}
		
	});
	
	return new AppModel();
});