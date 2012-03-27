define(function () {
	return function (instance) {
		return {
			/*
				# public methods accessible by facade
				# activator sends (config):
					{
						name: div id,
						el: div dom element,
						mod: path to module,
						arg: div module-parameters
					}
			*/
			init: function (config) {
				instance.model.set(config);
				return this;
			},
			restore: function (config) {
				instance.model.set(config);
				return this;
			},
			set: function (obj) {
				return instance.model.set(obj);
			},
			get: function (str) {
				return instance.model.get(str);
			},
			destroy: function () {
				return instance.destroy();
			},
			save: function () {
				return instance.model.toJSON();
			}
		}
	}
});