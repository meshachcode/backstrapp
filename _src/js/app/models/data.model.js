define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	
	/*
		* @class DataModel
		* @extends Backbone.Model
	*/
	var DataModel = Backbone.Model.extend({
		/*
			* @property {object} defaults
		*/
		defaults: {
			file: 'json/pages.json',
			pages: []
		},
		
		/*
			* @method initialize
		*/
		initialize: function () {
			this.bind('change:newpage', this.addPage, this);
		},

		/*
			* @method loadData
			* @param file, callback
		*/
		loadData: function (file, callback) {
			$.getJSON(file, function (json) {
				callback(json);
			});
		},

		/*
			* @method itemExists
			* @param needle, haystack
		*/
		itemExists: function (needle, haystack) {
			debug.debug('DataModel.itemExists', needle, haystack);
			var i, ret;
			for ( i in haystack ) {
				if (haystack[i].url == needle) {
					return haystack[i];
				}
			}
			return false;
		},

		/*
			* @method addPage
		*/
		addPage: function () {
			var p;
			p = this.get('pages');
			p.push(this.get('newpage'));
			this.set({ pages: p });
		}
	});

	return new DataModel();

});