/*
	Backstrapp
	to allow for easy assembly of the best versions of each class or module we write,
	this file is run the builder as well, so that Backstrapp can load with a single file.
	TODO: think through how to handle dependencies
	TODO: see if I can override require.config settings from here, if the file is included into another build
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
			// options:	
				// debugMode, appName, version, builder (bool), activator (bool) etc...
		},

		Facade: function () {
			return _facade
		},
		
		Mediator: function () {
			return _mediator
		},
		
		Permissions: function () {
			return _permissions
		},

		Error: function () {
			return _error
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
		
		Util: function () {
			return _util
		},
		
		Template: function () {
			return _template
		},

		Module: function () {
			return _moduleFactory
		},
		
		App: function () {
			return _app
		}

	};

	return function () {
		return Backstrapp
	};

})