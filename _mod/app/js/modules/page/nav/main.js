define(['../facade'], function (facade) {
	var el, html = '', navTemplate = 'html/test/content/nav.html';
	
	var nav = {
		init: function (params) {
			facade.subscribe('nav', 'renderDone', this.updateActive);
			this.render();
		},
		
		updateActive: function (page) {
			console.log('updateActive', page);
			$('.active', el).removeClass('active');
			$('#nav_' + page, el).addClass('active');
		},

		render: function () {
			require(['text!' + navTemplate], function (response) {
				el.html(response);
			});
		}
	}

	return {
		init: function (item, params) {
			el = item;
			nav.init(params);
		}
	};
});