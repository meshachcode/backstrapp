define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){

	/**
		* @module Vent
		* @extends Backbone.Events
	*/
	
	var Vent = _.extend({}, Backbone.Events);

	return Vent;
});