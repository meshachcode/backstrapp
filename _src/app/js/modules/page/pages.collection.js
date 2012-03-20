define(['backbone', './page.model'], function (Backbone, Page) {

	var PagesCollection = Backbone.Collection.extend({
		pages: [],
		pagesLoaded: false,
		model: Page,
		url: "https://api.mongolab.com/api/1/databases/test/collections/pages?apiKey=4f67b8c4e4b0145e2b31d0d1",
		
		getPages: function (callback) {
			for (var i in this.models) {
				this.pages.push(this.models[i].attributes);
			}
			return this.pages;
		}
	});

	return new PagesCollection();

});