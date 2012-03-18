/**
	* Nav Module
*/
define(['lib/backstrapp/module.0.2', 'core/facade'], function (ModuleClass, f) {

	var NavModule = ModuleClass.extend({
		/*
			* @property view
		*/
		view: 'html/app/parts/nav.html',
		animation: {
			time: 250
		},
		
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'process', 'updateActive');
			this.base(request);
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
			console.log('updateActive called', page);
			$('.active', this.el).removeClass('active');
			$('#nav_' + page, this.el).addClass('active');
		}
	});

	return {
		instance: {},
		init: function (request) {
			this.instance = new NavModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	};
});