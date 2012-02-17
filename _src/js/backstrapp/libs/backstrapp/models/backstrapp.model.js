define([
	'jQuery',
	'Underscore',
	'Backbone',
	'backstrapp/models/request.model'
], function($, _, Backbone, RequestModel){

	/**
		* @class Backstrapp.Model
		* @extends Backbone.Model
	*/
	var Model = Backbone.Model.extend({
		defaults: {
			name: 'default'
		},
		/*
			* The valid object is used in the validate method
			* @property valid 
		*/
		valid: {
			request:	{
				type:	{}
			},
			current:	{
				type:	{}
			},
			errors:		{
				type:	{}
			}
		},

		/* 
			* @method validate 
		*/
		validate: function (args, callback) {
			debug.count();
			var i, valid = true, errors = [], arg, rule;
			// loop through the given args
			for (i in args) {
				arg = args[i];
				rule = this.valid[i];
				debug.debug(arg, rule);
				debug.debug('validating', i);
				// if a property is being set that we have a validation rule for...
				if (rule != undefined) {
					debug.debug('comps', arg, rule.type);
					debug.debug('types', typeof(arg), typeof(rule.type));
					// now we're trying to find out if the current *value* meets the validation rules
					if (typeof(rule.type) != typeof(arg)) {
						errors.push("Trying to pass off " + arg + " as a " + rule.type + ". Pssht. Please.");
						valid = false;
					} else {
						debug.debug('Valid');
					}
				}
			}

			if (typeof(callback) == 'function') {
				callback(valid);
			}

			if (!valid) {
				return "Validation Error(s): \n\t" + errors.join("\n\t");
			}
		}
		
	});

	return Model;
});

