require.config({
	catchError: {
		define: true
	},
	// Debug mode only!
	waitSeconds: 2,
    paths: {
		html:			'../html',
		jquery: 		'../lib/jquery/jquery-min',
		underscore: 	'../lib/underscore/underscore-min',
		backbone: 		'../lib/backbone/backbone-optamd3-min',
		handlebars:		'../lib/handlebars/handlebars-min',
		backstrapp:		'../lib/backstrapp',
		util:			'../lib/backstrapp/util',
		text: 			'../lib/require/text',
		jsonLoad:		'../lib/require/json',
		json:			'../../json',
		modules:		'../modules',
		modules_js:		'../modules',
		modules_html:	'../../html/modules',
		loadcss:		'../util/loadcss',
		cookie:			'../util/cookie',
		base:			'../util/base',
		core:			'../core',
		tests:			'../tests',
		template: 		'../lib/backstrapp/modules/template.0.1',
		debug:			'../lib/backstrapp/classes/debug.class.0.1'
    }
});

QUnit.config.autostart = false;
require([
	'backstrapp/core/handler.error',
	'tests/unit-tests/permissions.test',
	'tests/unit-tests/mediator.test',
	'tests/unit-tests/facade.test',
	'tests/unit-tests/module.factory.test',
	'tests/unit-tests/modules.collection.test'
],

function (handler, permissions, mediator, facade, factory, ModulesCollection) {
	require.onError = handler;
	QUnit.start();
	mediator.RunTests();
	permissions.RunTests();
	facade.RunTests();
	ModulesCollection.RunTests();
	factory.RunTests();
});