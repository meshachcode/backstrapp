/**
	* Nav Module
*/
define(['underscore', 'lib/backstrapp/module', 'core/facade'], function (_, mod, f) {
	var Module = new mod({ autoload: true });

	Module.extend({
		template: 'html/app/parts/nav.html',
		
		start: function () {
			f.subscribe(this.name, 'pageModulePageReady', this.updateActive);
			f.publish(this.name, this.events.loadReady);
		},
		
		process: function (markup) {
			var obj = {
				meta: f.getMeta(),
				pages: f.getPages()
			}
			var me = this;
			f.processTemplate(markup, obj, this.publish);
		},

		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}

	});
	// this is here to allow the module to pass 'autoload:true' to the constructor,
	// and avoid the need for an extra init() call 
	_.bindAll(Module, 'process', 'start');

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});