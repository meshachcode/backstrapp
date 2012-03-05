define(['../utils', '../facade'], function (utils, facade) {
	var el, html = '', template = 'html/test/content/nav.html';
	
	var nav = {
		init: function (params) {
			facade.subscribe('nav', 'renderDone', this.updateActive);
			if (params != undefined) {
				this.processParams(params, this.render);
			}
		},

		processParams: function (params, callback) {
			var paramObj = utils.objectifyParams(params);
			if ( paramObj.template != undefined ) {
				navTemplate = paramObj.template;
			}
			callback();
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
			console.log('el', item);
			el = item;
			nav.init(params);
		}
	};
});