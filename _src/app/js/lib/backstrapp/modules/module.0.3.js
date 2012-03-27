/*
	* Module Class 0.3
	* (facade)
	* this surfaces public behaviors for the module API
*/
define(['./module.class.0.3', 'backstrapp/core/facade'], function (ModuleClass, facade) {

	var Module = ModuleClass.extend({
		constructor: function (config) {
			this.base(config);
			if (this.get('autoload')) {
				this.show();
			}
		},
		publish: function (event, params) {
			var channel = this.name + facade.util.camelize(event);
			if (this.debug.publish) {
				console.log('PPPub', event, this.name, channel);
			}
			facade.publish(this.name, channel, params);
		},
		subscribe: function (event, callback, context) {
			var me = context || this.name;
			var channel = me + facade.util.camelize(event);
			if (this.debug.subscribe) {
				console.log('SSSub', this.name, channel, context);
			}
			facade.subscribe(this.name, channel, callback, me);
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
			save: function () {
				return e.save();
			},
			restore: function (config) {
				if (e.get('autoload')) {
					e.show();
				}
				e.restore(config);
				return this;
			},
			show: function () {
				e.show();
			},
			hide: function () {
				e.hide();
			},
			sub: function (e, c, i) {
				e.subscribe(e, c, i);
			},
			pub: function (e, p) {
				e.publish(e, p);
			}
		}
	}

});