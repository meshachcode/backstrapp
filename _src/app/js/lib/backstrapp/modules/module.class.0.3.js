define(['base'], function () {

	var bsModule = Base.extend({
		public: {
			html: '',
			view: '',
			debug: {}
		},

		constructor: function (config) {
			this.public.debug.init = this.set(config);
		},
		
		set: function (obj) {
			var ret = {error: 'error test'};
			for (var i in obj) {
				if (this.public[i] != undefined) {
					ret.success = (!ret.success) ? {} : ret.success;
					this.public[i] = obj[i];
					ret.success[i] = this.public[i];
				} else {
					ret.notset = (!ret.notset) ? {} : ret.notset;
					ret.notset[i] = obj[i];
				}
			}
			if (!ret.notset) {delete ret.error};
			return ret;
		},
		
		get: function () {
		},

		render: function (el) {
			$(this.el).html(this.html);
		}

	});

	return bsModule;

});