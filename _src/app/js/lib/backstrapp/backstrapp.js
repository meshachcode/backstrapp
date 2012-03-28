/*
	Backstrapp
	to allow for easy assembly of the best versions of each class or module we write,
	this file is run the compiler as well, so that Backstrapp can load with a single file.
*/

define([
	'core/facade',
	'core/mediator',
	'core/permissions',
	'core/handler.error',
	'core/debug.0.1',
	'core/router',
	'utils/content-builder',
	'utils/module-activator',
	'util',
	'modules/template.0.1',
	'modules/module.factory.0.1',
	'core/app.0.1'
], 

function (
 _facade, _mediator, _permissions, _error, _debug, _router, _builder, _activator, _util, _template, _moduleFactory, _app
) {

	var Backstrapp = {
		config: {
			debugMode: false
		},

		Util: _util,
		Module: _moduleFactory,

		Facade: function (m, p) {
			m = (!m) ? new Backstrapp.Mediator() : m;
			p = (!p) ? new Backstrapp.Permissions() : p;
			return _facade(m, p);
		},
		
		Mediator: function () {
			return new _mediator();
		},
		
		Permissions: function () {
			return _permissions
		},

		Error: function () {
			return new _error();
		},
		
		Debug: function () {
			return _debug
		},
		
		Router: function () {
			return _router
		},
				
		Builder: function () {
			return _builder
		},
		
		Activator: function () {
			return _activator
		},
		
		Template: function () {
			return _template
		},
		
		App: function () {
			return _app
		}
	};

	return Backstrapp

})