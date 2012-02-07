define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){

	var Vent = _.extend({}, Backbone.Events);
	
	return Vent;
});