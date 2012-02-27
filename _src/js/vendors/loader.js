define([
	'order!vendors/debug/debug',
	'order!vendors/jquery/jquery-min',
	'order!vendors/jquery/jquery-ui.min',
	'order!vendors/jquery/jquery-serialize',
	'order!vendors/jquery/plugins',
	'order!vendors/underscore/underscore-min',
	'order!vendors/backbone/backbone-min',
	'order!vendors/backbone/backbone.query',
	'order!vendors/backbone/backbone.validation'
],
function () {
	return {
		Backbone: Backbone,
		_: _,
		$: jQuery.noConflict()
	};
});