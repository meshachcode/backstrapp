/**
	* Nav Module
*/
define(['lib/backstrapp/module', 'core/facade'], function (ModuleClass, f) {

	var NavModule = ModuleClass.extend({
		/*
			* @property view
		*/
		view: 'html/app/parts/nav.html',
		animation: {
			time: 250
		},
		
		constructor: function (obj) {
			this.util.bindAll(this, 'start', 'process', 'updateActive');			
			this.base(obj);
		},
		
		/*
			* @method start
		*/
		start: function () {
			this.subscribe('renderComplete', this.updateActive, 'pageModule');
			this.base();
		},
		
		/*
			* @method process
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
		*/
		updateActive: function (page) {
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}
	});

	return {
		instance: new NavModule(),
		init: function (item, params) {
			return this.instance._init(item, params);
		},
		restore: function (item, params) {
			return this.instance.restore(item, params);
		}
	};
});