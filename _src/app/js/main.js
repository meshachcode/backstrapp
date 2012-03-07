require({
    paths: {
        html:			'../html',
	    jquery: 		'lib/jquery/jquery-min',
	    underscore: 	'lib/underscore/underscore-min',
	    backbone: 		'lib/backbone/backbone-optamd3-min',
	    text: 			'lib/require/text',
	    json:			'lib/require/json',
	    data:			'../data'
    }
},
['util/content-builder', 'util/module-activator'], function (builder, activator) {
    activator.execute();
    builder.execute();
});