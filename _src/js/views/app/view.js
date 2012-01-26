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

  /**
  * This view contains all logic related to the application. 
  * Sets up all events related to loading pages (just static HTML that
  * silentrly inserts inside your #content), or modules (your own defined
  * apps). 
  *
  * Keep in mind that this is a whole lot of boilerplate code for you 
  * to be able to have a site like project, with many applications mixed
  * with static pages. Best of all, you don't need to touch this code, 
  * you just build your modules and load them, then is just matter
  * of listening to the right events.
  * 
  * The view binds actions related to resource (DataModel:data) loading
  * and page/module rendering.
  **/
	var AppView = Backbone.View.extend({
		el: $('#content'),
		model: AppModel,

		initialize: function () {
			debug.time('dataLoad');
			debug.debug('AppView.init()');
      
      /**
      * Fires whenever you change the "data variable in the DataModel,
      * I.e every time you call DataModel.set("data",{})
      * Data being a definition of what to load, something like :
      * { 
      *   pages : [
      *      {
      *         file: "/path/to/file",
      *         title: "The Menu name of this page",
      *         type: "[page|app]",
      *         url: "myapp", //Any name that seems like decent url
      *         visible: [true|false] //either if is visible or not in the nav
      *      }
      *      ... (you define how many, just remember thew will load at once)
      *      {
      *         file: "/path/to/otherfile",
      *         title: "The Menu name of this other page",
      *         type: "[page|app]",
      *         url: "myotherapp", //Any name that seems like decent url
      *         visible: [true|false] //either if is visible or not in the nav
      *      }
      *   ]
      * }
      * 
      * You can actually change the whole navigation of your site by resetting the data variable.
      **/
			DataModel.bind('change:data', this.router, this);
			DataModel.bind('change:data', this.buildNav, this);
			
      /**
      * Fires whenever the pageHtml variable is changed, This is the way you load
      * your application html from inside your module (DataModel.set({ newpage: "html here" }),
      * of course you want this to be loaded from an Undrscore template.
      **/
			DataModel.bind('change:pageHtml', this.render, this);

			PagesCollection.bind('add', this.appendNavItem, this);

			Vent.bind('navigate:page', 	this.model.findPage, this);
			Vent.bind('pagetype:page', 	this.model.loadPage, this);
			Vent.bind('pagetype:app', 	this.loadApp, this);
			Vent.bind('render:nav', 	this.updateNav, this);			

			this.model.loadData();
		},
		
		render: function () {
			Vent.trigger('render:nav');
			debug.debug('AppView.renderPage()');
			var me;
			me = this;
			this.el.parent().fadeOut(100, function () {
				debug.debug('animation over');
				me.el.html(DataModel.get('pageHtml'));
				me.el.parent().fadeIn(400);
        var page = DataModel.get('currentPage');
        /**
        * You are likely to need  to know when your module has finished loading its HTML inside
        * the DOM, this events tells you so. Inside your module you just listen for this to occur.
        * i.e : Vent.bind('renderfinish:myapp')
        **/
        Vent.trigger('renderfinish:'+page.name);
			});
		},
		
		router: function () {
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
		
		updateNav: function () {
			debug.debug('AppView.updateNav()');
			$('li.active', '#nav').removeClass('active');
			debug.debug('AppView.currentPage', DataModel.get('currentPage'));
			$("#nav_" + DataModel.get('currentPage').url).addClass('active');
		}

	});

	return AppView;

});
