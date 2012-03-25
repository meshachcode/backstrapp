define([
	'backstrapp/classes/module.face.0.1', 
	'backstrapp/modules/jquibs.accordion.module.0.1', 
	'backstrapp/modules/jquibs.tabs.module.0.1', 
	'backstrapp/modules/jquibs.message.module.0.1'
],

function (ModuleFace, Accordion, Tabs, Message) {
	
	var Module = {
/*
		accordion: Accordion,
		tabs: Tabs,
*/
		message: Message
	}

	return function (type, config) {
		var ret = {};
		if (Module[type] == undefined) {
			ret = {error: 'Module is not defined', m: type};
		} else {
			// Singleton
			var instance = new Module[type](config);
			if (instance.model.get('isValid')) {
				ret = new ModuleFace(instance);
			} else {
				ret = {error: 'Module is not valid', m: instance};
			}
		}
		return ret;
	}

});