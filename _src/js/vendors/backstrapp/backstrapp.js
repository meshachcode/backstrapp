define([
	'vendors/backstrapp/backstrapp.app',
	'vendors/backstrapp/models/backstrapp.model',
	'vendors/backstrapp/views/backstrapp.view',
	'vendors/backstrapp/modules/backstrapp.module'
],

function (App, Model, View, Module) {

    return {
		_VERSION	: 'sqrl',
		App			: App,
		Model		: Model,
		View		: View,
		Module		: Module
	};

});