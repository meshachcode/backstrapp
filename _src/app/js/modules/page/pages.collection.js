define(['jsonLoad!json/config.json', 'backbone', './page.model', 'core/facade'], function (config, Backbone, Page, f) {

	var PagesCollection = Backbone.Collection.extend({
		pages: [],
		pagesLoaded: false,
		model: Page,
		url: "https://api.mongolab.com/api/1/databases/test/collections/pages?apiKey=4f67b8c4e4b0145e2b31d0d1",

		initialize: function () {
			f.util.bindAll(this, 'getPage', 'getPages');
		},

		getPages: function () {
			if (this.pages.length == 0){
				for (var i in this.models) {
					this.pages.push(this.models[i].attributes);
				}
			}
			return this.pages;
		},

		getPage: function (name, callback) {
			var pages = this.getPages();
			console.log('collection getPage', name, pages);
			for (var i in pages) {
				if (pages[i].name == name) {
					console.log('found it!', pages[i]);
					callback(pages[i]);
				}
			}
		}
	});

	return new PagesCollection();

});