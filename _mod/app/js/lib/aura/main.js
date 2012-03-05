/**
 * A framework for large scale Javascript applications
 */
require.config({
  paths: {
    jquery: 'lib/jquery/jquery-min',
    underscore: 'lib/underscore/underscore-min',
  }
});

require(["./mediator"], function (mediator) {
	mediator.publish('appInit', "#app");
});
