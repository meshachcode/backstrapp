define([
		'jQuery', 
		'Underscore',
		'Backbone'
	], 

function($, _, Backbone) {

	/*
		* @class TemplateModel
		* @extends Backbone.Model
	*/
	var TemplateModel = Backbone.Model.extend({

		/*
			* @method initialize
		*/
		initialize: function () {
			return
		},

		/*
			* @method loadTemplate
			* @param obj, callback
		*/
		loadTemplate: function (obj, callback) {
			var template;
			template = Handlebars.compile(obj.template);
			callback(template(obj));
		}

	});
	return new TemplateModel();
});