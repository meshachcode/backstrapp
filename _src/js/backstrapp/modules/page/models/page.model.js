define([
  'Backstrapp'
], function(Backstrapp){

	var PageModel = Backstrapp.Model.extend({
		defaults: {
			name:	'page',
			views: 	[
				{
					name	:	'default',
					type	:	'static'
				},
				{
					name	:	'about',
					type	:	'static'
				}
			]
		},
		
		valid: 	{
			id:		{
				type: 	'string'
			},
			type:	{
				type: 	'string'
			},
			name:	{
				type:	'string'
			},
			view:	{
				type:	'string'
			}
		},

		/*
			* @method validate
		*/
		validate: function (args) {
			var i, valid = true, errors = [];
			// run through the Backstrapp validation method
			Backstrapp.Model.prototype.validate.call(this, args, function (valid) {
				
				debug.debug('PageModel validate', valid);
			});

			if (!valid) {
				return "Validation Error(s): \n\t" + errors.join("\n\t");
			}
		}
	});

	return PageModel;
});