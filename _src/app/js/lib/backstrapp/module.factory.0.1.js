define(['lib/backstrapp/modules/jquibs.module.0.1', './classes/module.face.0.1'], 

function (t, ModuleFace) {
	
	var Module = {
		Template: t
	}

	return function (type, config) {
		console.log('factory', arguments);
		// Singleton
		var instance = new Module[type](config);
		return new ModuleFace(instance);
	}

});