/*
	* Data Module
	* @module Data
*/
define([
	'jQuery',
	'Backstrapp'
], function($, Backstrapp){
	
	/*
		* @class DataModel
		* @extends Backbone.Model
	*/
	var DataModel = Backstrapp.Model.extend({
		/*
			* @method initialize
		*/
		initialize: function () {
			this.set({ file: 'json/pages.json' });
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
		itemExists: function (needle, haystack, param) {
			var i, ret;
			for ( i in haystack ) {
				if (haystack[i][param] == needle) {
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