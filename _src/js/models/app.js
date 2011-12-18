define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var AppModel = Backbone.Model.extend({
		
		loadPage: function (callback) {
			debug.debug('AppModel.loadPage()');
//			debug.debug(this.get('currentPage'));
/*
			$.get(this.get('currentPage').file, function (html) {
				debug.debug(html);
				this.set({pageHtml: html});
				callback();
			});
*/
		}
		
	});
	
	return new AppModel();
});