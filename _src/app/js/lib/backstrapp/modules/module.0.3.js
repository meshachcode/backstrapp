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
		var e = new Module(config);

		return {
			get: function (str) {
				return e.get(str);
			},
			set: function (obj) {
				return e.set(obj);
			},
			restore: function (config) {
				if (e.get('autoload')) {
					e.show();
				}
				e.restore(config);
				return this;
			},
			save: function () {
				return e.save();
			},
			show: function () {
				e.show();
			},
			hide: function () {
				e.hide();
			}
		}
	}

});