/*
	* Module Class 0.3
	* (mediator)
*/
define(['base'], function () {

	var bsModule = Base.extend({
		public: {
			autoload: true,
			html: '',
			view: '',
			debug: {}
		},

		constructor: function (config) {
			this.public.debug.init = this.set(config);
		},
		
		restore: function (config) {
			this.public.debug.restore = this.set(config);
		},

		set: function (obj) {
			var ret = {error: 'error setting obj'};
			for (var i in obj) {
				if (this.public[i] != undefined) {
					ret.success = (!ret.success) ? {} : ret.success;
					this[i] = obj[i];
					ret.success[i] = this[i];
				} else {
					ret.notset = (!ret.notset) ? {} : ret.notset;
					ret.notset[i] = obj[i];
				}
			}
			if (!ret.notset) {delete ret.error};
			return ret;
		},
		
		get: function (str) {
			return (this.public[str] != undefined) ? this.public[str] : {error: 'could not get ' + str};
		},

		render: function (el) {
			var dom = (el != undefined) ? el : this.el;
			$(dom).html(this.html);
			console.log('rendered', $(dom).html());
		}

	});

	return bsModule;

});