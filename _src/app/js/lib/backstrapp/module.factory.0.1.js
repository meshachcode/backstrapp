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
		console.log('factory', arguments);
		// Singleton
		var instance = new Module[type](config);
		return new ModuleFace(instance);
	}

});