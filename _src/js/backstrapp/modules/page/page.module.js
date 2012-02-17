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
		views: {
			index	:	new PageView()
		},

		initialize: function () {
			Backstrapp.Module.prototype.initialize.call(this);
		},

		changeHandler: function () {
			Backstrapp.Module.prototype.changeHandler.call(this);
			var page = this.model.get('current');
			if (this.views[page.view] != undefined) {
				this.views[page.view].load(page);
			}
		}
	});

	Page = new PageModule();

	Modules.add(Page);

	return Page;
});