/* 	Backstrapp ModuleFactory */

define([
	'backstrapp/core/classes/module.face.0.1',
	'backstrapp/modules/template.module.0.1'
],

function (ModuleFace, Template) {

	var Module = {
		template: Template
	}

	return function (type, config) {
		var ret = {};
		if (Module[type] == undefined) {
			ret = {error: 'Module is not defined', m: type};
		} else {
			var instance = new Module[type](config);
			ret = new ModuleFace(instance);
		}
		return ret;
	}

});