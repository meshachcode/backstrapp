define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var DataModel = Backbone.Model.extend({
		defaults: {
			file: 'json/pages.json',
			features: [
				{file: '/templates/features/extra.html', 		target: '#feature-left'}, 
				{file: '/templates/features/front-end.html', 	target: '#feature-middle'}, 
				{file: '/templates/features/javascript.html',	target: '#feature-right'}
			]
		},
		
		loadData: function (file, callback) {
			$.getJSON(file, function (json) {
				callback(json);
			});
		},
		
		itemExists: function (needle, haystack) {
			debug.debug('DataModel.itemExists(needle, haystack)', needle, haystack);
			var i, ret;
			for ( i in haystack ) {
				if (haystack[i].url == needle) {
					return haystack[i];
				}
			}
			return false;
		}
	});

	return new DataModel();

});