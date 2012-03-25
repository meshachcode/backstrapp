/* 	TODO: create module.0.5, with the factory in mind */


define(['./classes/module.face.0.1',
	// Modules
	'./modules/module.0.4'
], 

function (ModuleFace,
	// Modules
	Simple
) {
	
	var Module = {
		simple: Simple
	}

	return function (type, config) {
		// Singleton
		var instance = new Module[type](config);
		console.log('factory', arguments, instance);
		return new ModuleFace(instance);
	}

});