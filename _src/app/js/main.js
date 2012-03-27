require.config({
	catchError: {
		define: true
	},
    paths: {
		html:			'../html',
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		handlebars:		'lib/handlebars/handlebars-min',
		backstrapp:		'lib/backstrapp',
		util:			'lib/backstrapp/util',
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',
		json:			'../json',
		modules:		'modules',
		modules_js:		'modules',
		modules_html:	'../html/modules',
		loadcss:		'util/loadcss',
		cookie:			'util/cookie',
		base:			'util/base',
		core:			'core',
		tests:			'tests',
		template: 		'lib/backstrapp/modules/template.0.1',
		debug:			'lib/backstrapp/classes/debug.class.0.1'
    }
});

/* App Main */
require(['core/handler.error', 'backstrapp/utils/module-activator', 'backstrapp/utils/content-builder', 'core/facade'], 

function (handler, activator, builder, facade) {
	require.onError = handler;

	activator.execute( );
	builder.execute( );


});