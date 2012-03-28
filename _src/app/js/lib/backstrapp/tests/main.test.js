require.config({
	//###### Debug mode only!
	waitSeconds: 2,
	catchError: {
		define: true
	},
	// ######### //
	baseUrl: '/app/js/lib/backstrapp',
    paths: {
    	// paths other scrips expect
    	lib:			'../',
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
		json:			'../../../json'
    }
});

QUnit.config.autostart = false;
require([
	'jquery',
	'tests/backstrapp.main.test'
],

function ($, BackstrappMainTest) {
	BackstrappMainTest.RunTests();
	QUnit.start();
});