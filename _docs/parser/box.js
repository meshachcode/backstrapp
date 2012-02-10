/*
	* The Box Module tests how modules work in Backstrapp
	* @module Box
	* @namespace Box
*/
define([
  'jQuery',
  'Handlebars',
  'Underscore',
  'Backbone'
], function($, Handlebars, _, Backbone){
	/*
		* @class BoxModel
		* @extends Backbone.Model
	*/
	var BoxModel = Backbone.Model.extend({
		/*
			* @property defaults
		*/
		defaults: {
			'msg'	: 	'hey there'
		}
	});

	/*
		* @class BoxView
		* @extends Backbone.View
	*/
	var BoxView = Backbone.View.extend({
		/*
			* @property model
		*/
		model: new BoxModel(),
		/*
			* @method initialize
		*/
		initialize: function () {
			debug.debug('BoxView');
			debug.debug('MSG', this.model.get('msg'));
		}
	});

	return new BoxView();
});