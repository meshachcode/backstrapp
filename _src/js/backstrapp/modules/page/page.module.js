define([
	'Backstrapp', 
	'collections/modules.collection',
	'modules/page/models/page.model',
	'modules/page/views/page.view'
],

function( Backstrapp, Modules, PageModel, PageView ){

	var Page, PageModule;
	PageModule = Backstrapp.Module.extend({
		model: new PageModel(),

		views: new Backstrapp.Collection(),

		initialize: function () {
			Backstrapp.Module.prototype.initialize.call(this);
			this.views.bind('add', this.addView, this);
			this.initViews();
		},
		
		initViews: function () {
			var i, views = this.model.get('views');
			debug.debug('initViews', views);
			for (i in views) {
				this.views.add(views[i]);
			}
		},
		
		addView: function (args) {
			debug.debug('addView', args);
			args.set({ view: new PageView(args) });
		},

		changeHandler: function () {
			Backstrapp.Module.prototype.changeHandler.call(this);
			var page = this.model.get('current');
			debug.debug('changeHandler changed', page, this.views.models);
		}
	});

	Page = new PageModule();

	Modules.add(Page);

	return Page;
});