define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data'
], function($, _, Backbone, DataModel){
	
	var AppModel = Backbone.Model.extend({
		
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

		loadPage: function (callback) {
			debug.debug('AppModel.loadPage()');
			$.get(DataModel.get('currentPage').file, function (html) {
				debug.debug(html);
				DataModel.set({pageHtml: html});
				callback();
			});
		}
		
	});
	
	return new AppModel();
});