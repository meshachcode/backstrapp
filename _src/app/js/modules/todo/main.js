define(["./views/appView", "util/loadCss", "backbone", "underscore", "lib/jquery/jquery.tmpl"], 

function (AppView, loadCss) {

	return {
		init: function (item, params) {
			loadCss("todos");
			var app = new AppView();
		}
	};

});