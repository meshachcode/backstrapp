define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/data',
  'models/app',
  'models/template',
  'models/module',
  'collections/pages',
  'events/vent'
], function($, _, Backbone, Router, DataModel, AppModel, TemplateModel, Module, PagesCollection, Vent){

	var AppView = Backbone.View.extend({
		el: $('#content'),
		model: AppModel,

		initialize: function () {
			debug.time('dataLoad');
			debug.debug('AppView.init()');

			DataModel.bind('change:data', this.render, this);
			DataModel.bind('change:data', this.buildNav, this);

			Vent.bind('navigate:page', 	this.model.findPage, this);
			Vent.bind('pagetype:page', 	this.model.loadPage, this);
			Vent.bind('pagetype:app', 	this.loadApp, this);
			Vent.bind('render:page', 	this.renderPage, this);
			Vent.bind('render:nav', 	this.updateNav, this);
			
			PagesCollection.bind('add', this.appendNavItem, this);

			this.model.loadData();
		},
		
		render: function () {
			debug.debug('AppView.render()');
			this.router = new Router();
			debug.timeEnd('dataLoad');
			return this;
		},
		
		buildNav: function () {
			debug.debug('AppView.buildNav()');
			debug.debug(DataModel.get('data').pages);
			var i, pages;
			pages = DataModel.get('data').pages;
			for ( i in pages ) {
				debug.debug(pages[i].url);
				if ( pages[i].visible == true ) {
					// add the page to the PagesCollection
					PagesCollection.add(pages[i]);
					// $("#nav").append('<li id="nav_' + pages[i].url + '"><a href="/#/' + pages[i].url + '">' + pages[i].title + '</a></li>');
				}
			}
		},
		
		appendNavItem: function (p) {
			debug.debug('AppView.appendNavItem(p)', p);
			var page = p.attributes;
			debug.debug('page', page);
			$("#nav").append('<li id="nav_' + page.url + '"><a href="/#/' + page.url + '">' + page.title + '</a></li>');			
		},
				
		loadApp: function () {
			var page;
			page = DataModel.get('currentPage');
			debug.debug('AppView.loadApp()', page);
			debug.debug('AppView.loadApp() -> appPath', page.name);
			Vent.trigger('currentapp:' + page.name);
			Vent.trigger('render:nav');
		},

		renderPage: function () {
			Vent.trigger('render:nav');
			debug.debug('AppView.renderPage()');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				debug.debug('animation over');
				me.el.html(DataModel.get('pageHtml'));
				me.el.parent().fadeIn(400);
			});
		},
		
		updateNav: function () {
			debug.debug('AppView.updateNav()');
			$('li.active', '#nav').removeClass('active');
			debug.debug('AppView.currentPage', DataModel.get('currentPage'));
			$("#nav_" + DataModel.get('currentPage').url).addClass('active');
		}

	});

	return AppView;

});