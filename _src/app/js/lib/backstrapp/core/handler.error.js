define(function(){

	var Error = {
		name: 'errorHandler',
		debugMode: true,

		process: function (err) {
			// if it's a timeout error...
			if (err.requireModules) {
				err.mods = this.buildModNames(err.requireModules);
				for (var i in err.mods) {
					var e = {error: 'Load Failed', e: err};
					if (this.f != undefined) {
						this.f.publish(this.name, 'errorModulePath', e);
					}
				}
			}
			Error.debug(err);
		},

		buildModNames: function (modules) {
			var mods = [], names = [], name = '';
			if (typeof modules != 'array') {
				mods = modules.split('/');
				name = mods.join('_');
				names.push(this.buildModName(name));
			} else {
				mods = modules;
				for (var i in mods) {
					names.push(this.buildModName(mods[i]));
				}
			}
			return names;
		},
		
		buildModName: function (module) {
			module = this.f.get('util').camelize(module, true);
			return module;
		},
		
		debug: function (error) {
			console.log('######### Backstrapp Error Handler #########');
	        console.log('\n STACK: ', error.stack);
	        console.log('\n ERROR OBJ: ', error);
			console.log('#################### FIN ###################');
		}
	}


	return function (facade) {
		// constructor
		if (facade != undefined) {
			Error.f = facade;
		}
		// handler call
		return function(err) {
			if (Error.debugMode) {
				Error.process(err);
			}
		}
	}

});