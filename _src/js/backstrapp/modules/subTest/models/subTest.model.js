define([
  'Backstrapp'
], function(Backstrapp){

	var SubTestModel = Backstrapp.Model.extend({
		defaults: {
			msg: 'child object message'
		},
		
		valid: {
			name: 	{
				type: 	'string'
			},
			phone:	{
				type: 	0
			},
			email:	{
				type: 	'string'
			}
		}
	});

	return SubTestModel;	
});