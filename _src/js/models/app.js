define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var AppModel = Backbone.Model.extend({
		
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