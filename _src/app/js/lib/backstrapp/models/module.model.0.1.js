/*
	* Module Model 0.1
*/
define(['backbone'], function (Backbone) {

	var ModuleModel = Backbone.Model.extend({

		defaults: {
			/*
				* RESERVED PROPERTY NAMES 
			*/
			template: 'Model.defaults.template',
			html:	  'Model.defaults.html',
			viewData: {},
			// strict and validation objects reside in 'defaults' to allow for extension by child objects
			strict: false,
			validation: {
				_template: {
					validate: function (v) {
						console.log('YOU CANNOT CHANGE RESERVED PROPS', v);
					}
				},
				arg: {
					type: 'object',
					validate: function (a) {
						return (typeof a == this.type);
					}
				}
			}
		},

		/*
			* this should only return false if: 
				- strict is set to true and there is no rule for the object being set
				- the validation rule for the item being set returns false
		*/
		validate: function (obj) {
			var ret = true;
			for (var i in obj) {
				if (this.get('validation')[i] != undefined) {
					if (!this.get('validation')[i].validate(obj[i])) {
						ret = false;
					}
				} else if (this.get('strict')) {
					ret = false;
				}
			}
			if (!ret) { return ret };
		}
	});

	return ModuleModel;

});