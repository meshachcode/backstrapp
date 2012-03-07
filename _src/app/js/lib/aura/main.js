/**
 * A framework for large scale Javascript applications
 */
require.config({
  paths: {
    jquery: '../../lib/jquery/jquery-min',
    underscore: '../../lib/underscore/underscore-min',
    modules:	'../../modules',
    lib:		'../../lib'
  }
});

require(["./facade"], function (facade) {
	facade.publish('appInit', "#app");
});
