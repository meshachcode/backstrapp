require.config({
	//###### Debug mode only!
	waitSeconds: 2,
	catchError: {
/* 		define: true */
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
		backbone:		'../backbone/backbone-optamd3-min',
		marionette:		'../backbone/backbone.marionette/lib/amd/backbone.marionette',
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

QUnit.config.autostart = false;
require([
	'jquery',
	'tests/backstrapp.main.test',
	'tests/core/facade.test',
	'tests/core/mediator.test',
	'tests/core/permissions.test',
	'tests/collections/modules.collection.test',
	'tests/collections/modules.collection.0.2.test',
	'tests/core/classes/module.class.test',
	'tests/core/app.test'
/* 	'tests/modules/module.factory.test' */
],

function ($, MainTest, FacadeTest, MediatorTest, PermissionsTest, ModulesCollectionTest, ModulesCollection02Test, ModuleClassTest, AppTest) {
	MainTest.RunTests();
	FacadeTest.RunTests();
	MediatorTest.RunTests();
	PermissionsTest.RunTests();
	ModulesCollectionTest.RunTests();
	ModulesCollection02Test.RunTests();
	ModuleClassTest.RunTests();
	AppTest.RunTests();
	QUnit.start();
});