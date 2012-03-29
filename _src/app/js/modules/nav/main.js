/**
	* Nav Module
*/
define(['backstrapp/backstrapp', 'modules_js/page/pages.collection'], 

function (Backstrapp, PagesCollection) {
	var config = {
		template: 'html/app/parts/nav.html'
	}
	var mod = new Backstrapp.Module('template', config);
	return mod;	
/*
	var NavModule = Module.extend({
		debug: {
			subscribe: true
		},
		view: 'html/app/parts/nav.html',
		animation: {
			time: 250
		},
		pages: [],
		constructor: function (request) {
			this.util.bindAll(this, 'start', 'process', 'updateActive');
			this.base(request);
		},
		start: function () {
			this.subscribe('renderComplete', this.updateActive, 'pageModule');
			this.subscribe('pagesLoaded', this.loadView, 'pageModule');
			this.base();
		},
		loadView: function (pages) {
			if (pages != undefined) {
				for (var i in pages) {
					this.pages.push({name: pages[i].name, title: pages[i].title, route: '/' + pages[i].name});
				}
				this.base();
			}
		},
		process: function (html) {
			var obj = {
				meta: facade.getMeta(),
				pages: this.pages
			}
			this.processTemplate(html, obj, this.setHtml);
		},
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
*/
});