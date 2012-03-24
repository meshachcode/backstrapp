define(['lib/backstrapp/modules/jquibs.module.0.1', './classes/module.face.0.1', './modules/jquibs.accordion.module.0.1', './modules/jquibs.tabs.module.0.1'], 

function (t, ModuleFace, Accordion, Tabs) {
	
	var Module = {
		accordion: Accordion,
		tabs: Tabs
	}

	return function (type, config) {
		// Singleton
		var instance = new Module[type](config);
		return new ModuleFace(instance);
	}

});