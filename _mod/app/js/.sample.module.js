define(['underscore', 'modules/maestro/facade', 'util/content-builder', 'util/module-activator',], 
function (_, f, builder, activator) {

	var e = {
		name:				'Message',
		renderEvent:		'',
		el: 				$(),
		html:		 		'',
		template:			'',
		isValid:			false,
		errors:				[],
		
		exports: {
			isValid: 	this.isValid,
			errors: 	this.errors,
			data:		this.data
		},

		init: function(params) {
			_.bindAll(this, 'render', 'validation');
			this.renderEvent = 'render' + this.name;
			f.subscribe(e.name, e.renderEvent, e.render);

			if (!_.isUndefined(params) && !_.isNull(params)) {
				this.utils.processParams(params, this.validation);
			}
		},
		
		validation: function (param) {
			if (!param) {
				e.errors.push({ msg: "No Object To Validate" });
			} else {
				if (param.template) {
					e.utils.loadView(param.template, function (response) {
						e.set({ html: response });
						e.set({ isValid: true });
						f.publish(e.name, e.renderEvent, e.exports);
					});
				}
			}
		},

		get: function (k) {
			if (_.has(e, k)) {
				return e[k];
			}
		},
		
		set: function (obj) {
			_.extend(e, obj);
		},

		extend: function (obj) {
			_.extend(obj, this);
		},
		
		render: function () {
			if (this.isValid) {
				$(this.el).html(this.html);
			} else {
				var eMsg = this.printErrors();
				$(this.el).html(eMsg);
			}
		},
		
		utils: {
			processParams: function (params, callback) {
				var paramObj = e.utils.objectifyParams(params);
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
				_.each(e.errors, function(e) {
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
			e.el = item;
			e.init(params);
			return e.exports
		},

		extend: function (obj) {
			return e.extend(obj);
		}
	};
});