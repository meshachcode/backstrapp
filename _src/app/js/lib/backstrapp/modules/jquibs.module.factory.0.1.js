/* 	JQuibs ModuleFactory */

define([
	'backstrapp/core/classes/module.face.0.1', 
	'backstrapp/modules/jquibs.accordion.module.0.1', 
	'backstrapp/modules/jquibs.tabs.module.0.1', 
	'backstrapp/modules/jquibs.message.module.0.1'
],

function (ModuleFace, Accordion, Tabs, Message) {
	
	var Module = {
		accordion: Accordion,
		tabs: Tabs,
		message: Message
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