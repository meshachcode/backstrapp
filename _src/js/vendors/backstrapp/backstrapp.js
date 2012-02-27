define([
	'order!vendors/backstrapp/models/data.model',
	'order!vendors/backstrapp/events/vent',
	'order!vendors/backstrapp/models/backstrapp.model',
	'order!vendors/backstrapp/views/backstrapp.view',
	'order!vendors/backstrapp/modules/backstrapp.module',
	'order!vendors/backstrapp/backstrapp.app'
],

function (Data, Vent, Model, View, Module, App) {
/*
	var app = new App();
	debug.debug('app', app);
*/
	return {
		Data: Data,
		Vent: Vent,
		Model: Model,
		View: View,
		Module: Module,
		App: App
	}
});