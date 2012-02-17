define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	var DataModel = Backbone.Model.extend({
		defaults: {
			file: 'json/pages.json',
			pages: []
		},
		
		initialize: function () {
			this.bind('change:newpage', this.addPage, this);
		},
    
    /**
    * Fetches a list of static html pages to be loaded
    * triggered at AppView.initialize
    **/
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
			debug.debug(this.get('newpage'));
			var p;
			p = this.get('pages');
			p.push(this.get('newpage'));
			this.set({ pages: p });
		}
	});

	return new DataModel();

});
