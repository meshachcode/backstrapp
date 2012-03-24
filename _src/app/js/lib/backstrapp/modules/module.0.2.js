/*
	* Simple Module
*/
define(['../classes/module.class.0.2'], function(ModuleClass) {

	var Module = ModuleClass.extend({
		autoload				: true,
		inheritEvents			: true,
		/*
			* @property events
			* TODO: there is currently no way to blend outside objects with this one, or remove any of these links from outside of the class. Externalize a solution for that.
		*/
		events: {
			'restoreComplete'	: 'loadView',
			'startComplete'		: 'loadView',
			'loadViewComplete'	: 'process',
			'processComplete'	: 'setHtml',
			'setHtmlComplete'	: 'activate',
			'activateComplete'	: 'render'
		},

		/*
			* @method constructor
		*/
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'render');
			return this.base(request);
		},

		/*
			* @method render
		*/
		render: function (el, html) {
			this.hide();
			this.base(el, html);
			this.show(this.animation.time);
		}
	});
	
	return Module

});