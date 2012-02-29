define([
	'wrap!underscore',
	'wrap!backbone'
], function(_, Backbone){

	var Vent = _.extend({}, Backbone.Events);

	return Vent;
});