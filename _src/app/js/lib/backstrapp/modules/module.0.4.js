/*
	* Module 0.4 ("Template Module")
	* This module should receive 2 params (msg & view)
	* on init, the module should try to load :view as an html file
	* once :view is loaded, :msg should be applied to it as a template var
	* 
	* TODO: This is a smashing success, and an excellent start to dealing with module
	* independence and sandboxing. However, it's a bit bulky, no?
	* Clean it up, test the hell out of the idea that this can be reasonably extended 
	* by only passing parameters (for example, what happens when you run 
	* model.set({somefunction: function (...?
*/
define(['jquery', 'template', '../classes/module.class.0.4', '../classes/module.face.0.1'], 

function ($, t, ModuleClass, ModuleFace) {

	var _private = {
		/*
			* @property params
			* this is just like a validation object, 
			* BUT ... EVERY ITEM is an asynchronous method
			* TODO: refactor?
		*/
		params: {
			template: function (v, callback) {
				require(['text!' + v], function (f) {
					callback('template', f);
				});
			}
		}
	};

	var Module = ModuleClass.extend({
		/* Module-Type Specific Behaviors & Default Properties */
		processable: [],
		processed: [],
		required: [],

		/*
			* @method initialize
			* this is the minimum your method can have if it wants to call it's parent (send complaints to Backbone)	
		*/
		initialize: function (config) {
			this.bindAll(this, 'setParams');
			ModuleClass.prototype.initialize.apply(this, config);
			this.model.bind('complete:params', this.setHtml, this);
		},

		/*
			* @method processParams
			* receives data-module-parameters as 2nd argument (objectified by activator)
			* the object here has already passed model validation rules
			* TODO: 3 methods and a 3 arrays to handle params, really? There's gotta be a lighter-weight solution, no?
		*/
		processParams: function (o, paramObj) {
			this.processed = [];
			this.processable = Object.keys(paramObj);
			if (this.util.hasAllKeys(paramObj, this.required)) {
				this.processParamRules(paramObj, this.setParams);
			} else {
				this.model.set({html: 'ERROR: Missing required param. Required params: ' + this.required.join(',')});
			}
		},
		
		processParamRules: function (paramObj, callback) {
			// loop through paramObj, and see if you have any rules for them
			for (var i in paramObj) {
				this.processed.push(i);
				if (_private.params[i]) {
					_private.params[i].call(this, paramObj[i], callback);
				} else {
					callback(i, paramObj[i]);
				}
			}
		},

		/*
			* @method setParams
			* @param key
			* @param value
		*/
		setParams: function (k, v) {
			this.model.attributes[k] = v;
			var diff = this.util.difference(this.processable, this.processed);
			if (this.util.isEmpty(diff)) {
				this.model.trigger('complete:params');
			}
		},
		/*
			* @method setHtml
			* set model.html, based on the information available.
				- is there a template? 
					- if so, process it with the model
					- if not, pick a parameter, any parameter...?
		*/
		setHtml: function () {
			var html = this.model.get('html');
			if (this.model.get('template') != this.model.defaults.template) {
				var o = this.model.toJSON();
				html = t.process(o, this.model.get('template'));
			} else {
				// set html to the msg val for now...
				// TODO: maybe this is defined by the module instance?
				html = this.model.get('msg');
			}
/* 			console.log('setting HTML', html); */
			this.model.set({html: html});
		}
	});

	return function (config) {
		// Singleton
		var instance = new Module(config);
		return new ModuleFace(instance);
	}

});