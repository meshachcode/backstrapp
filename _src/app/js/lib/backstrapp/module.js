/*
	* Simple Module
*/
define(['./module_new'], function(ModClass) {

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
		view: 'html/modules/dev/parts/msg.html',
		
		constructor: function (params) {
			this.util.bindAll(this, 'start');
			this.base(params);
		},

		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.subscribe('startComplete', this.loadView);
			this.subscribe('loadViewComplete', this.process);
			this.subscribe('processComplete', this.setHtml);
			this.subscribe('setHtmlComplete', this.activate);
			this.subscribe('activateComplete', this.render);
			this.base();
		}
	});
	
	var instance = null;
	return new function () {
		console.log('### Simple Module return');
		if (instance == null) {
			console.log('### Simple Module New Instance');
			instance = new Module();
			instance.constructor = null;
		}
		return instance;
	}
});