define([
	'Backstrapp', 
	'modules/subTest/models/subTest.model'
], 

function( Backstrapp, SubTestModel ){

	var SubTest = Backstrapp.Module.extend({
		model: new SubTestModel(),

		initialize: function () {			
			var obj = {};
			obj.name = "meshach";
			obj.phone = 3;
			obj.email = "meshach@jollyscience.com";

			this.model.set(obj, {
				error: function (model, error) {
					debug.debug('ERROR', model, error)
				}
			});
		}
	});

	return new SubTest();
});