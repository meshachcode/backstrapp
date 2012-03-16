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
		core:			'../core'
    }
},
[
	"unit-tests/permissions.module.test", 
	"unit-tests/mediator.module.test",
	"unit-tests/moduleClass.module.test"
], 
function (testModule, mediator, moduleClass) {
	QUnit.start();
	testModule.RunTests();
	mediator.RunTests();
	moduleClass.RunTests();
});