define([
		'jQuery', 
		'Underscore',
		'Backbone'
	], 

function($, _, Backbone) {

	var TemplateModel = Backbone.Model.extend({

		initialize: function () {
			debug.debug('TemplateModel.init()');
			return
		},

		loadTemplate: function (obj, callback) {
			debug.debug('TemplateModel.loadTemplate(obj)', obj);
			var template;
			template = Handlebars.compile(obj.template);
			callback(template(obj));
		}

	});
	return new TemplateModel();
});