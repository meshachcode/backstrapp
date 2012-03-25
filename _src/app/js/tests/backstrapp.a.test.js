QUnit.config.autostart = false;
require({
    paths: {
		html:			'../html',
		jquery: 		'../lib/jquery/jquery-min',
		underscore: 	'../lib/underscore/underscore-min',
		backbone: 		'../lib/backbone/backbone-optamd3-min',
		handlebars:		'../lib/handlebars/handlebars-min',
		backstrapp:		'../lib/backstrapp',
		text: 			'../lib/require/text',
		jsonLoad:		'../lib/require/json',
		json:			'../../json',
		aura:			'../lib/aura',
		modules:		'../modules',
		modules_js:		'../modules',
		modules_html:	'../../html/modules',
		loadcss:		'../util/loadcss',
		cookie:			'../util/cookie',
		base:			'../util/base',
		core:			'../core',
		tests:			'../tests'
    }
},
[
	'tests/unit-tests/permissions.test',
	'tests/unit-tests/mediator.test'
/* 	'tests/unit-tests/moduleClass.test', */
/* 	'tests/unit-tests/testModule.test' */
], 
function (permissions, mediator /* moduleClass, */ /* testModule */) {
	QUnit.start();
	permissions.RunTests();
	mediator.RunTests();
/*
	moduleClass.RunTests();
	testModule.RunTests();
*/
});