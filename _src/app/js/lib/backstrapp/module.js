/*
	* Simple Module
*/
define(['./module.class'], function(ModClass) {

	var Module = ModClass.extend({
		/*
			* @property autoload
			* this tells the Module super class to call 'start()' on 'initComplete'
		*/
		autoload: true,

		/*
			* @property view
			* this is used by Module.load(), which calls 'process()' as a callback
		*/

		constructor: function (obj) {
			this.util.bindAll(this, 'start', 'render');
			this.base(obj);
		},

		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.subscribe('restoreComplete', this.loadView);
			this.subscribe('startComplete', this.loadView);
			this.subscribe('loadViewComplete', this.process);
			this.subscribe('processComplete', this.setHtml);
			this.subscribe('setHtmlComplete', this.activate);
			this.subscribe('activateComplete', this.render);
			this.base();
		},
		
		render: function (el, html) {
			this.hide();
			this.base(el, html);
			this.show(this.animation.time);
		}
	});
	
	return Module
});