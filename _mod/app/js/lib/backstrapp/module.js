define(['underscore', 'lib/aura/core/mediator', 'modules/maestro/facade', 'util/content-builder', 'util/module-activator',], 
function (_, m, f, builder, activator) {

	var e = {
		name:				'Module',
		renderEvent:		'',
		el: 				$(),
		html:		 		'',
		template:			'',
		isValid:			false,
		errors:				[],
		
		exports: function () {
			return {
				isValid: 	this.isValid,
				errors: 	this.errors,
				data:		this.data
			}
		},

		init: function(params) {
			_.bindAll(this, 'render', 'validation', 'publish');
			this.renderEvent = 'render' + m.util.camelize(this.name);

			f.subscribe(this.name, this.renderEvent, this.render);

			if (!_.isUndefined(params) && !_.isNull(params)) {
				this.utils.processParams(params, this.validation);
			}
		},
		
		validation: function (param) {
			if (param.template) {
				this.utils.loadView(param.template, this.publish, this);
			}
		},
		
		publish: function (response) {
			this.set({ html: response });
			this.set({ isValid: true });
			var ex = this.get('exports');
			f.publish(this.name, this.renderEvent, ex);
		},
		
		render: function () {
			if (this.isValid) {
				$(this.el).html(this.html);
			} else {
				var eMsg = this.printErrors();
				$(this.el).html(eMsg);
			}
		},
		
		get: function (k) {
			if (this[k] != undefined) {
				if (_.isFunction(e[k])) {
					return this[k]();
				} else {
					return this[k];
				}
			}
		},
		
		set: function (obj) {
			var i;
			for (i in obj) {
				this[i] = obj[i];
			}
		},

		extend: function (obj) {
			_.extend(obj, this);
			return obj;
		},

		utils: {

			processParams: function (params, callback) {
				var paramObj = this.objectifyParams(params);
				callback(paramObj);
			},

			objectifyParams: function (paramStr) {
				var pObj = {},
					pArr = [],
					iArr = [];
				pArr = paramStr.split(',');
				_.each(pArr, function (i) {
					iArr = i.split(':');
					pObj[iArr[0]] = iArr[1];
				});
				return pObj;
			},
		
			printErrors: function () {
				var msg;
				_.each(this.errors, function(e) {
					msg += "ERROR: " + e + "<br />";
				});
				return msg;
			},

			loadView: function (path, callback) {
				require(['text!' + path], function (response) {
					callback(response);
				});
			}				
		}
	};

	return {
		init: function (item, params) {
			var n = $(item).attr('id');
			e.set({ name: n, el: item });
			e.init(params);
			return e.exports
		},

		extend: function (obj) {
			var ret = e.extend(obj);
			return ret;
		}
	};
});