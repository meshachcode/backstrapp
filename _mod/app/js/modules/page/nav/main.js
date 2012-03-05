define(['underscore', 'lib/backstrapp/module', '../facade'], function (_, mod, facade) {
	var Module = new mod();

	Module.extend({
		
		template: 'html/test/content/nav.html',

		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', el).removeClass('active');
			$('#nav_' + page, el).addClass('active');
		},

		render: function () {
			var el = this.el;
			require(['text!' + this.template], function (response) {
				el.html(response);
			});
		}
		
	});

	return {
		init: function (item, params) {
			facade.subscribe('nav', 'renderDone', this.updateActive);
			var n = $(item).attr('id');
			Module.set({ name: n, el: item });
			Module.base(params);
			return Module.exports();
		}
	};
});