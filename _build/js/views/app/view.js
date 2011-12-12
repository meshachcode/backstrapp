define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/data',
  'models/template',
  'events/vent'
], function($, _, Backbone, Router, DataModel, TemplateModel, Vent){
	
	var AppView = Backbone.View.extend({
		el: $('#content'),

		initialize: function () {
			debug.time('dataLoad');
			debug.debug('AppView.init()');
			DataModel.bind('change:file', this.loadData, this);
			DataModel.set({file: 'json/pages.json'});
			DataModel.bind('change:data', this.render, this);

			Vent.bind('navigate:home', 	this.loadHome, this);
			Vent.bind('navigate:page', 	this.loadPage, this);
			Vent.bind('show:home', 		this.renderHome, this);
			Vent.bind('show:page', 		this.renderPage, this);			
		},
		
		render: function () {
			debug.debug('AppView.render()');
			this.router = new Router();
			debug.timeEnd('dataLoad');
			return this;
		},
		
		loadData: function () {
			debug.debug('AppView.loadData()');
			DataModel.loadData(DataModel.get('file'), function (json) {
				DataModel.set({data: json});
			})
		},
		
		loadHome: function () {
			debug.debug('AppView.loadHome()');
			// load home page from templates/pages/home.html into the #content div
			$.get(DataModel.get('homeTemplate'), function (html) {
				debug.debug(html);
				DataModel.set({homeHtml: html});
				Vent.trigger('show:home');
			})
		},

		renderHome: function () {
			debug.debug('AppView.renderHome()');
			this.el.html(DataModel.get('homeHtml'));
		},

		loadPage: function () {
			debug.debug('AppView.loadPage()');
			debug.debug('DataModel.pages', DataModel.get('data').routes);
			var page;
			if (page = DataModel.itemExists(DataModel.get('requestedPage'), DataModel.get('data').routes)) {
				$.get(page, function (html) {
					debug.debug(html);
					DataModel.set({pageHtml: html});
					Vent.trigger('show:page');
				});
			} else {
				debug.debug('PAGE NOT FOUND');
				this.router.navigate('/home', true);
				Vent.trigger('navigate:home');
			}
		},

		renderPage: function () {
			debug.debug('AppView.renderPage()');
			this.el.html(DataModel.get('pageHtml'));
		}
	});

	return AppView;

});