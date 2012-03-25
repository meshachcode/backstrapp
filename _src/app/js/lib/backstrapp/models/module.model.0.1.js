/*
	* Module Model 0.1
*/
define(['backbone'], function (Backbone) {

	var ModuleModel = Backbone.Model.extend({

		defaults: {
			isValid: true,
			isVisible: true,
			isActive: true,
			template: 'Model.defaults.template',
			html:	  'Model.defaults.html',
			viewData: {},
			/*
				* TODO: move validation logic to a Backbone extension so other models can use it.
				* TODO: UNIT TEST THIS MOFO!! Test the validation object being set externally. 
				Test the different kinds of validation you'll need, and maybe write a validation plugin that 
				leverages the ones that are out there, but make ours AMD-friendly?
			 */
			// strict and validation objects reside in 'defaults' to allow for extension by child objects
			strict: false,
			validation: {
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
				- strict is set to true and there is no rule for the object being set (if not yes, then no)
				- the validation rule for the item being set returns false 
					NOTE: any item of the object failing means all of them fail... bug, or feature?
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