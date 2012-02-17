define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){

	var View = Backbone.View.extend({
		model: new Backbone.Model(),
		
		initialize: function () {
			this.model.bind('change:html', this.render, this);
		},

		load: function (arg) {
			debug.debug(arg);
		},
		
		render: function () {
			this.el.html(this.model.get('html'));
			return this;
		}
	});
	
	return View;
});