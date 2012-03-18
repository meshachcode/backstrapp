define(['./views/appView', 'util/loadCss', 'backbone', 'underscore', 'lib/jquery/jquery.tmpl'], 

function (AppView, loadCss) {

	return {
		css: 'todos',
		init: function (request) {
			var app = new AppView();
		}
	};

});