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
		json:			'../../../json'
    }
});

QUnit.config.autostart = false;
require([
	'jquery',
	'tests/backstrapp.main.test',
	'tests/core/facade.test',
	'tests/core/mediator.test',
	'tests/core/permissions.test',
	'tests/collections/modules.collection.test',
	'tests/classes/module.class.test'
/* 	'tests/modules/module.factory.test' */
],

function ($, MainTest, FacadeTest, MediatorTest, PermissionsTest, ModulesCollectionTest, ModuleClassTest) {
	MainTest.RunTests();
	FacadeTest.RunTests();
	MediatorTest.RunTests();
	PermissionsTest.RunTests();
	ModulesCollectionTest.RunTests();
	ModuleClassTest.RunTests();
	QUnit.start();
});