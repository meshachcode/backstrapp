/*
	* Module 0.5 ("Backstrapp Module")
*/
define(['jquery', 'backstrapp/modules/template.0.1', 'backstrapp/core/classes/module.class.0.5'], 

function ($, t, ModuleClass) {

	/* Module-Type Specific Behaviors & Default Properties */
	var Module = ModuleClass.extend({
		/*
			* @property params
			* this is just like a validation object, 
			* BUT ... EVERY ITEM is an asynchronous method
		*/
		params: {
			template: function (v, callback) {
				require(['text!' + v], function (f) {
					callback('template', f);
				});
			}
		}
	});
	
	return Module;
});