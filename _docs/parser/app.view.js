/**
	* The AppView is the main object of the application.
	* @module AppView
	* @requires $, _, Backbone, Router, DataModel, AppModel, TemplateModel, Module, PagesCollection, Vent
*/
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/data.model',
  'models/app.model',
  'models/template.model',
  'moduleLoader',
  'collections/pages',
  'events/vent'
], function($, _, Backbone, Router, DataModel, AppModel, TemplateModel, Module, PagesCollection, Vent){

	/**
		* @class AppView
		* @extends Backbone.View
	*/
	var AppView = Backbone.View.extend({
		/**
			* @property el
		*/
		el: $('#content'),
		/**
			* @property model
		*/
		model: AppModel,

		/**
			* @method initialize
		*/
		initialize: function () {
			debug.time('dataLoad');
			debug.debug('AppView.init()');
			DataModel.bind('change:data', 		this.router, this);
			DataModel.bind('change:data', 		this.buildNav, this);
			DataModel.bind('change:pageHtml', 	this.render, this);
			PagesCollection.bind('add', 		this.appendNavItem, this);
			Vent.bind('navigate:page', 			this.model.findPage, this);
			Vent.bind('pagetype:page', 			this.model.loadPage, this);
			Vent.bind('pagetype:app', 			this.loadApp, this);
			Vent.bind('render:page', 			this.render, this);
			Vent.bind('render:nav', 			this.updateNav, this);
			this.model.loadData();
		},

		/**
			* @method render
		*/
		render: function () {
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
		
		/**
			* @method router
		*/
		router: function () {
			debug.debug('AppView.render()');
			this.router = new Router();
			debug.timeEnd('dataLoad');
			return this;
		},
		
		/**
			* @method buildNav
		*/
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
				}
			}
		},
		
		/**
			* @method appendNavItem
		*/
		appendNavItem: function (p) {
			debug.debug('AppView.appendNavItem(p)', p);
			var page = p.attributes;
			debug.debug('page', page);
			$("#nav").append('<li id="nav_' + page.url + '"><a href="/#/' + page.url + '">' + page.title + '</a></li>');
		},
				
		/**
			* @method loadApp
		*/
		loadApp: function () {
			var page;
			page = DataModel.get('currentPage');
			debug.debug('AppView.loadApp()', page);
			debug.debug('AppView.loadApp() -> appPath', page.name);
			Vent.trigger('currentapp:' + page.name);
			Vent.trigger('render:nav');
		},
		
		/**
			* @method updateNav
		*/
		updateNav: function () {
			debug.debug('AppView.updateNav()');
			$('li.active', '#nav').removeClass('active');
			debug.debug('AppView.currentPage', DataModel.get('currentPage'));
			$("#nav_" + DataModel.get('currentPage').url).addClass('active');
		}

	});

	return AppView;

});