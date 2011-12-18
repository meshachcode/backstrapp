define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var DataModel = Backbone.Model.extend({
		defaults: {
			file: 'json/pages.json'
		},
		
		initialize: function () {
			this.bind('change:newpage', this.addPage, this);
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
		},

		addPage: function () {
			debug.debug('DataModel.addPage()');
			debug.debug(DataModel.get('newpage'));
		}
	});

	return new DataModel();

});