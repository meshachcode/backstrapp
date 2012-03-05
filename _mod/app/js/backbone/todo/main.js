define(["./views/appView",
        "util/loadCss",
         "app/js/lib/backbone.js",
         "app/js/lib/underscore.js",
         "app/js/lib/jquery.tmpl.js"],
    	function (AppView, loadCss) {
			//loadCss("todos");
    	    var app = new AppView();
    	    return {};
    	});
