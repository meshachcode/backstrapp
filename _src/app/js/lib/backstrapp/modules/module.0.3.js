/*
	* Module Class 0.3
	* (facade)
*/
define(['./module.class.0.3'], function (ModuleClass) {

	var Module = ModuleClass.extend({
		constructor: function (config) {
			this.base(config);
			if (this.autoload) {
				this.show();
			}
		}
	});

	return function (config) {
		var instance = new Module(config);
		return {
			get: function (str) {
				return instance.get(str);
			},
			set: function (obj) {
				return instance.set(obj);
			},
			restore: function (config) {
				if (instance.get('autoload')) {
					instance.show();
				}
				instance.restore(config);
				return this;
			},
			save: function () {
				return instance.save();
			},
			show: function () {
				instance.show();
			},
			hide: function () {
				instance.hide();
			}
		}
	}

});