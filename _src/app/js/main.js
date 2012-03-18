/* App Main */
require({
    paths: {
		html:			'../html',
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		handlebars:		'lib/handlebars/handlebars',
		backstrapp:		'lib/backstrapp',
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',
		json:			'../json',
		aura:			'lib/aura',
		modules:		'modules',
		modules_js:		'modules',
		modules_html:	'../html/modules',
		loadcss:		'util/loadcss',
		cookie:			'util/cookie',
		base:			'util/base',
		core:			'./core'
    }
},
['backstrapp/content-builder', 'backstrapp/module-activator'], function (builder, activator) {
	activator.execute();
	builder.execute();
});