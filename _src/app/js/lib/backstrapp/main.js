/* 
	Backstrapp Main 
*/
define([

	'backstrapp/core/facade',
	'backstrapp/core/mediator',
	'backstrapp/core/permissions',
	'backstrapp/utils/content-builder',
	'backstrapp/utils/module-activator',
	'backstrapp/modules/router',
	'backstrapp/modules/module.0.2',
	'backstrapp/modules/router.module.0.2'

], function(f, m, p, b, a, r, Module, RouteModule) {

	var backstrapp = {
		Mediator	: m,
		Facade		: f,
		Permissions	: p,
		Activator	: function (el) {
			return a.execute(el, backstrapp.Facade.getModule);
		},
		Builder		: function (el) {
			return b.execute(el, backstrapp.Facade, backstrapp.Activator);
		},
		Router		: r,
		Module		: Module,
		RouteModule	: RouteModule
	}

	return backstrapp;

});