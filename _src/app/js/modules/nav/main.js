/**
	* Nav Module
*/
define(['underscore', 'lib/backstrapp/module', 'core/facade'], function (_, mod, f) {
	var Module = new mod();

	Module.extend({
		template: 'html/app/parts/nav.html',

		init: function (item, params) {
			_.bindAll(this, 'load', 'process', 'start');
			// setup the module name and el
			var n = $(item).attr('id');
			this.set({ name: n, el: item });
			this.base(item, params);
			return this.exports();
		},
		
		start: function () {
			f.subscribe(this.name, 'pageModulePageReady', this.updateActive);
			f.publish(this.name, this.events.loadReady);
		},
		
		load: function () {
			console.log('load ' + this.name, this.template);
			require(['text!' + this.template], this.process);
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

	return {
		init: function (item, params) {
			return Module.init(item, params);
		}
	};
});