require.config({
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

require(['./backstrapp.js'],

function (Backstrapp) {
	new Backstrapp();
});