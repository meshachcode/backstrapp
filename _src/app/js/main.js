/* App Main */
require({
    paths: {
		html:			'../html',
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		handlebars:		'lib/handlebars/handlebars',
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',
		json:			'../json',
		aura:			'lib/aura',
		modules:		'modules',
		modules_js:		'modules',
		modules_html:	'../html/modules',
		core:			'core'
    }
},
['util/content-builder', 'util/module-activator'], function (builder, activator) {
	activator.execute();
	builder.execute();
});