define(['backbone', 'core/facade'], function (Backbone, f) {

	var PagesCollection = Backbone.Collection.extend({
		pagesLoaded: false,
		url: "https://api.mongolab.com/api/1/databases/test/collections/pages?apiKey=4f67b8c4e4b0145e2b31d0d1",

		initialize: function () {
			f.util.bindAll(this, 'getPage', 'getPages');
		},
		
		parse: function (response) {
			return response;
		},

		getActivePages: function () {
			return this.filter(function (page) {
				return page.get('active');
			});
		},
		
		getPages: function () {
			var pages = this.getActivePages();
			return pages.map(function (page) {
				return page.attributes;
			});
		},

		getPage: function (name, callback) {
			var pages = this.getPages();
			for (var i in pages) {
				if (pages[i].name == name) {
					callback(pages[i]);
				}
			}
			return false;
		}
	});

	return PagesCollection;

});