/*
	* JQUIBS Module 0.4 ("Jquery UI Bootstrap Module")
	* This module should receive 2 params (msg & view)
	* on init, the module should try to load :view as an html file
	* once :view is loaded, :msg should be applied to it as a template var
	* 
	* TODO: Reorganize the structure of backstrapp... it's getting messy
	* TODO: This is a smashing success, and an excellent start to dealing with module
	* independence and sandboxing. However, it's a bit bulky, no?
	* Clean it up, test the hell out of the idea that this can be reasonably extended 
	* by only passing parameters (for example, what happens when you run 
	* model.set({somefunction: function (...?
*/
define(['jquery', 'template', 'backstrapp/classes/module.class.0.4'], 

function ($, t, ModuleClass) {

	/* Module-Type Specific Behaviors & Default Properties */
	var Module = ModuleClass.extend({
		/*
			* @property params
			* this is just like a validation object, 
			* BUT ... EVERY ITEM is an asynchronous method
			* TODO: refactor?
		*/
		params: {
			template: function (v, callback) {
				console.log('processing template', arguments);
				/* TODO: Catch errors when the template can't load */
				require(['text!' + v], function (f) {
					callback('template', f);
				});
			}
		}
	});
	
	return Module;
});