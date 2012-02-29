define(['jQuery', 'Underscore', 'Backstrapp', 'collections/modules.collection', 'modules/page/models/page.model', 'modules/page/views/static.view', 'modules/page/views/template.view'], 

function ($, _, Backstrapp, Modules, PageModel, StaticView, TemplateView) {

	var Page = Backstrapp.Module.extend({
		el: $('#content_main'),
		model: new PageModel(),

		viewClasses: {
			'static': StaticView,
			'template': TemplateView
		},

		initialize: function () {
			Backstrapp.Module.prototype.initialize.call(this);
			Modules.add(this);
			this.model.bind('change:view', this.loadView, this);
			_.bindAll(this, 'setHtml');
		},

		changeHandler: function () {
			var request, page, result, view;
			request = this.model.get('current');
			page = DataModel.get('pages')[request.slug]; // combine the requested page with the page from the DM
			result = $.extend(true, page, request);
			result.view = this.getView(result);
			this.model.set({
				view: result
			});
		},

		getView: function (obj) {
			var ret = 'template';
			if (obj.type == 'content') {
				ret = 'static';
			}
			return ret;
		},

		loadView: function () {
			debug.debug('loadView', this.model.get('view'));
			var page = this.model.get('view');
			this.model.loadHtml(page.file, this.setHtml);
		},

		setHtml: function (response) {
			var view = this.model.get('view').view,
				current = this.model.get('current');
			this.model.get('views')[view].instance.model.set({
				current: current,
				html: response
			});
		}
	});
	return new Page();
});
