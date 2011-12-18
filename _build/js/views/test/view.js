define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	var TestView = Backbone.View.extend({
		el: $('#content'),
		pageData: {
			"url"		:	"test",
			"title"		:	"Test",
			"type"		:	"app",
			"name"		:	"test",
			"visible"	:	true
		},
		
		testHtml: "<h1>MY TEST APP</h1>",

		initialize: function () {
			Vent.bind('currentapp:test', this.render, this);
			debug.debug('TestView.init()');
			DataModel.set({ newpage: this.pageData });
		}, 
		
		render: function () {
			debug.debug('TestView.render()');
			DataModel.set({ pageHtml: this.testHtml });
		}
	});
	
	return new TestView();
	
});