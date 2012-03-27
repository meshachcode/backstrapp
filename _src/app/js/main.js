require.config({
	catchError: {
/* 		define: true */
	},
    paths: {
		html:			'../html',
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		handlebars:		'lib/handlebars/handlebars',
		backstrapp:		'lib/backstrapp',
		util:			'lib/backstrapp/core/util',
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',
		json:			'../json',
		modules:		'modules',
		modules_js:		'modules',
		modules_html:	'../html/modules',
		loadcss:		'util/loadcss',
		cookie:			'util/cookie',
		base:			'util/base',
		core:			'backstrapp/core',
		tests:			'tests',
		template: 		'lib/backstrapp/modules/template.0.1',
		debug:			'lib/backstrapp/classes/debug.class.0.1'
    }
});

/* App Main */
require(['backstrapp/core/handler.error', 'backstrapp/core/app.0.1'],

function (handler, App) {
	require.onError = handler;
	new App();
});