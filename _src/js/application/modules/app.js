define([

  'backstrapp'

], function(Backstrapp){

	var e = {};

	return function (config) {
		this.app = new Backstrapp.App(config);
		return this;
	}

});