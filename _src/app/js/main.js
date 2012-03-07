require({
    paths: {
		html:			'../html',
		jquery: 		'lib/jquery/jquery-min',
		underscore: 	'lib/underscore/underscore-min',
		backbone: 		'lib/backbone/backbone-optamd3-min',
		text: 			'lib/require/text',
		jsonLoad:		'lib/require/json',
		json:			'../json',
		aura:			'lib/aura',
		modules:		'modules',
		modules_js:		'modules',
		modules_html:	'../html/modules'
    }
},
['lib/backstrapp/content-builder', 'lib/backstrapp/module-activator'], function (builder, activator) {
	activator.execute();
	builder.execute();
});