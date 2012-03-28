// Message Demo
define(['backstrapp/modules/jquibs.module.factory.0.1'],

function (ModuleFactory) {

	var config = {
		path: 'jquibs/message',
		id: 'jquibMessage',
      	pars: [
      		{message: 'This is a live preview of the new jQuery UI Bootstrap theme -  a project I started to bring the beauty of Twitter\'s <a href="http://twitter.github.com/bootstrap/">Bootstrap</a> to jQuery UI widgets.'},
      		{message: 'With this theme, not only do you get the ability to use Bootstrap-themed widgets, but you can now also use (most) of Twitter Bootstrap side-by-wide with it without components breaking visually.'},
      		{message: 'It\'s still a work-in-progress, but I hope you find it useful. Issues and pull requests are always welcome - <a href="http://twitter.com/addyosmani">@addyosmani</a>'}
      	]
	};

	var Module = new ModuleFactory('message', config);

	return Module;

});