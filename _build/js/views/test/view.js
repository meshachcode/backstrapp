define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/data',
  'events/vent'
], function($, _, Backbone, DataModel, Vent){
	
	var TestView = Backbone.View.extend({
		className: "hero-unit",
	
		pageData: {
			"url"		:	"test",
			"title"		:	"Test",
			"type"		:	"app",
			"name"		:	"test",
			"visible"	:	false
		},
		
		testHtml: "<div><h1>MY TEST APP</h1></div>",

		initialize: function () {
			Vent.bind('currentapp:test', this.render, this);
			debug.debug('TestView.init()');
			DataModel.set({ newpage: this.pageData });
		}, 
		
		render: function () {
			debug.debug('TestView.render()');
			$(this.el).html(this.testHtml);
			DataModel.set({ pageHtml:  this.el });
		}
	});
	
	return new TestView();
	
});