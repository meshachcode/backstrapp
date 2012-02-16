/**
	* The AppView is the main object of the application.
	* @module AppView
	* @requires $, _, Backbone, Router, DataModel, AppModel, TemplateModel, Module, PagesCollection, Vent
*/
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'Backstrapp',
  'router',
  'modules/data/data.module',
  'modules/template/template.module',
  'models/app.model',
  'collections/pages.collection',
  'events/vent'
], function($, _, Backbone, Backstrapp, Router, DataModel, TemplateModel, AppModel, PagesCollection, Vent){

	/**
		* @class AppView
		* @extends Backbone.View
	*/
	var AppView = Backstrapp.View.extend({
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
			debug.debug('initialize', DataModel.get('requested'));
			_.bindAll(this);
			DataModel.bind('change:requested', 	this.handleRequest, this);
			DataModel.bind('change:data', 		this.router, this);
/*
			DataModel.bind('change:data', 		this.buildNav, this);
			DataModel.bind('change:pageHtml', 	this.render, this);
			PagesCollection.bind('add', 		this.appendNavItem, this);
			Vent.bind('navigate:page', 			this.model.findPage, this);
			Vent.bind('pagetype:page', 			this.model.loadPage, this);
			Vent.bind('pagetype:app', 			this.loadApp, this);
			Vent.bind('render:page', 			this.render, this);
			Vent.bind('render:nav', 			this.updateNav, this);
*/
			this.model.loadData();
		},
		
		moduleRequest: function () {
			debug.debug('moduleRequest', DataModel.get('requested'));
		},

		/**
			* @method render
		*/
		render: function () {
			Vent.trigger('render:nav');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				me.el.html(DataModel.get('pageHtml'));
				me.el.parent().fadeIn(400);
			});
		},

		/**
			* @method router
		*/
		router: function () {
			this.router = new Router();
			return this;
		},

		/**
			* @method buildNav
		*/
		buildNav: function () {
			var i, pages;
			pages = DataModel.get('data').pages;
			for ( i in pages ) {
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
			var page = p.attributes;
			$("#nav").append('<li id="nav_' + page.url + '"><a href="/#/' + page.url + '">' + page.title + '</a></li>');
		},

		/**
			* @method loadApp
		*/
		loadApp: function () {
			var page;
			page = DataModel.get('currentPage');
			Vent.trigger('currentapp:' + page.name);
			Vent.trigger('render:nav');
		},

		/**
			* @method updateNav
		*/
		updateNav: function () {
			$('li.active', '#nav').removeClass('active');
			$("#nav_" + DataModel.get('currentPage').url).addClass('active');
		}

	});

	return AppView;

});