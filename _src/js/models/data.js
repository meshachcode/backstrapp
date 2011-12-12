define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var DataModel = Backbone.Model.extend({
		defaults: {
			features: [
				{file: '/templates/features/extra.html', 		target: '#feature-left'}, 
				{file: '/templates/features/front-end.html', 	target: '#feature-middle'}, 
				{file: '/templates/features/javascript.html',	target: '#feature-right'}
			],
			homeTemplate: '/templates/pages/home.html'
		},
		
		loadData: function (file, callback) {
			$.getJSON(file, function (json) {
				callback(json);
			});
		},
		
		itemExists: function (needle, haystack) {
			var i, ret;
			for ( i in haystack ) {
				if ( ret = haystack[i][needle] ) {
					debug.debug(ret);
					return ret;
				}
			}
			return false;
		}
	});

	return new DataModel();

});