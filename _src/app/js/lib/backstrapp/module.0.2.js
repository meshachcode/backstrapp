/*
	* Simple Module
*/
define(['./module.class.0.2'], function(ModClass) {

	var Module = ModClass.extend({
		autoload				: true,
		inheritEvents			: true,
		events: {
			'restoreComplete'	: 'loadView',
			'startComplete'		: 'loadView',
			'loadViewComplete'	: 'process',
			'processComplete'	: 'setHtml',
			'setHtmlComplete'	: 'activate',
			'activateComplete'	: 'render'
		},

		/*
			* @property constructor
		*/
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'render');
			return this.base(request);
		},

		render: function (el, html) {
			this.hide();
			this.base(el, html);
			this.show(this.animation.time);
		}
	});
	
	return Module
});