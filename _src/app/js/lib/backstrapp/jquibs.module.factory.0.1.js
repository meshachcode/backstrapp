define(['lib/backstrapp/modules/jquibs.module.0.1', './classes/module.face.0.1', './modules/jquibs.accordion.module.0.1'], 

function (t, ModuleFace, Accordion) {
	
	var Module = {
		accordion: Accordion
	}

	return function (type, config) {
		// Singleton
		var instance = new Module[type](config);
		return new ModuleFace(instance);
	}

});