define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){

	var View = Backbone.View.extend({
		initialize: function (obj) {
			this.model = new Backbone.Model(obj);
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