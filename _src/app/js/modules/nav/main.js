/**
	* Nav Module
*/
define(['underscore', 'lib/backstrapp/module_new', 'core/facade'], function (_, mod, f) {
	var Module = new mod();

	Module.extend({
		/*
			* @property autoload
			* this tells the Module super class to call 'start()' on 'initComplete'
		*/
		autoload: true,

		/*
			* @property template
			* this is used by Module.load(), which calls 'process()' as a callback
		*/
		template: 'html/app/parts/nav.html',
		
		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.newEvent('pageModulePageReady');
			this.subscribe('pageModulePageReady', this.updateActive);
			this.subscribe('processComplete', this.activate);
			this.subscribe('startComplete', this.load);
			this.base();
		},
		
		/*
			* @method process
			* called by load() with the loaded html from this.template
			* if you 
		*/
		process: function (html) {
			var obj = {
				meta: f.getMeta(),
				pages: f.getPages()
			}
			this.processTemplate(html, obj, this.activate);
		},
		
		/*
			* @method activate
			* 
		*/
		activate: function (h) {
			this.set({ html: h });
			this.base();
		},

		/*
			* @method updateActive
			* 
		*/
		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}

	});
	// this is here to allow the module to pass 'autoload:true' to the constructor,
	// and avoid the need for an extra init() call 
	_.bindAll(Module, 'process', 'load', 'start', 'activate', 'updateActive');

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});