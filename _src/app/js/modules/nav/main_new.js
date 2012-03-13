/**
	* Nav Module
*/
define(['lib/backstrapp/module', 'core/facade'], function (Module, f) {

	Module.extend({
		/*
			* @property view
			* this is used by Module.load(), which calls 'process()' as a callback
		*/
		view: 'html/app/parts/nav.html',
		
		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
		*/
		start: function () {
			this.newEvent('pageModuleRenderComplete');
			this.subscribe(this.name, this.events.pageModuleRenderComplete, this.updateActive);
			this.base();
		},
		
		/*
			* @method process
			* called by load() with the loaded html from this.template
			* the super version of this method just runs the following:
				* this.processTemplate(html, this.exports, this.activate)
		*/
		process: function (html) {
			var obj = {
				meta: f.getMeta(),
				pages: f.getPages()
			}
			this.processTemplate(html, obj, this.setHtml);
		},

		/*
			* @method updateActive
			* 
		*/
		updateActive: function (page) {
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}

	});

	return {
		init: function (item, params) {
			// bindAll here to allow the module to pass 'autoload:true' to the constructor,
			// and avoid the need for an extra init() call 
			f.util.bindAll(Module, 'start', 'process');
			return Module._init(item, params);
		}
	};
});