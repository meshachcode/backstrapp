require.config({
    paths: {
    	// paths other scrips expect
    	lib:			'../',
    	modules_js:		'../../modules',

    	// require plugins
		text: 			'../require/text',
		jsonLoad:		'../require/json',

		// libs
		jquery: 		'../jquery/jquery-min',
		underscore: 	'../underscore/underscore-min',
		backbone: 		'../backbone/backbone-optamd3-min',
		handlebars:		'../handlebars/handlebars',
		backstrapp:		'../backstrapp',

		// utils
		util:			'utils/util',
		loadcss:		'../../util/loadcss',
		cookie:			'../../util/cookie',

		// tools
		json:			'../../../json',
		moduleModel:	'models/module.model.0.1',
		moduleClass:	'core/classes/module.class.0.5'
    }
});

require(['backstrapp.js'],

function (Backstrapp) {
	var App = new Backstrapp.App();
	App.start();
});