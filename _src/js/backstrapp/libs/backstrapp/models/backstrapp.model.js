define([
	'jQuery',
	'Underscore',
	'Backbone'
], function($, _, Backbone){

	/**
		* @class Backstrapp.Model
		* @extends Backbone.Model
	*/
	var Model = Backbone.Model.extend({
		/*
			* @property defaults 
		*/
		defaults: {
			requested:	{},
			current:	{},
			errors:		{}
		},

		/*
			* The valid object is used in the validate method
			* @property valid 
		*/
		valid: {
			name	:	{
				type: 	'string'
			},
			phone	:	{
				type: 	0
			}
		},

		/* 
			* @method validate 
		*/
		validate: function (args) {
			var i, valid = true, errors = [];
			// loop through the given args
			for (i in args) {
				// if a property is being set that we have a validation rule for...
				if (this.valid[i] != undefined) {
					// now we're trying to find out if the current *value* meets the validation rules
					if (typeof(this.valid[i].type) != typeof(args[i])) {
						errors.push("Trying to pass off " + args[i] + " as a " + typeof(this.valid[i].type) + ". Pssht. Please.");
						valid = false;
					}
				}
			}

			if (!valid) {
				return "Validation Error(s): \n\t" + errors.join("\n\t");
			}
		}
	});

	return Model;
});

