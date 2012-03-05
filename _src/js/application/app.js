define([
  'use!backstrapp'
], function(Backstrapp){

	return function (config) {
		return new Backstrapp.App(config);
	}

});