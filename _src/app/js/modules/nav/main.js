/**
	* Nav Module
*/
define(['backstrapp/modules/module.0.2', 'core/facade', 'modules/page/pages.collection'], 

function (Module, facade, PagesCollection) {

	var NavModule = Module.extend({
		debug: {
/* 			subscribe: true */
		},
		/*
			* @property view
		*/
		view: 'html/app/parts/nav.html',
		animation: {
			time: 250
		},
		pages: [],
		
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'process', 'updateActive');
			this.base(request);
		},

		/*
			* @method start
		*/
		start: function () {
			this.subscribe('renderComplete', this.updateActive, 'pageModule');
			this.subscribe('pagesLoaded', this.loadView, 'pageModule');
			this.base();
		},

		loadView: function (pages) {
			console.log('pages', pages);
			if (pages != undefined) {
				for (var i in pages) {
					this.pages.push({name: pages[i].name, title: pages[i].title, route: pages[i].name});
				}
				this.base();
			}
		},

		/*
			* @method process
		*/
		process: function (html) {
			var obj = {
				meta: facade.getMeta(),
				pages: this.pages
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
		instance: {},
		init: function (request) {
			this.instance = new NavModule(request);
			return this.instance;
		},
		restore: function (request) {
			return this.instance.restore(request);
		}
	}
});