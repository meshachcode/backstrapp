define(["./views/appView", "util/loadCss", "backbone", "underscore", "lib/jquery/jquery.tmpl"], 

function (AppView, loadCss) {

	loadCss("todos");

	var app = new AppView();

	return {};

});
