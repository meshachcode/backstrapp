require.config({
	catchError: {
		define: true
	},
    paths: {
    	// require plugins
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',

		// libs
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		handlebars:		'lib/handlebars/handlebars',

		// utils
		util:			'lib/backstrapp/utils/util',
		loadcss:		'util/loadcss',
		cookie:			'util/cookie',

		// tools
		backstrapp:		'lib/backstrapp',
		template: 		'lib/backstrapp/modules/template.0.1',
		debug:			'lib/backstrapp/classes/debug.class.0.1',
		json:			'../json',
		html:			'../html',
		modules_html:	'../html/modules',
		modules_js:		'modules',
		modules:		'modules',
		tests:			'tests'
    }
});

/* App Main */
require(['backstrapp/core/handler.error', 'backstrapp/core/app.0.1'],

function (handler, App) {
	require.onError = handler;
	App.start();
});