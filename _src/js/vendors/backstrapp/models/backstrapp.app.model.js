define(['wrap!backbone'], 	function(Backbone){

	var e = Backbone.Model.extend({
		defaults: {
			name: 'appModel'
		},
		
		validation: {
			request: {
				fn: 'requestHandler'
			}
		},
		
		requestHandler: function (obj) {
			if (obj != undefined) {
				console.log('requestHandler', obj.data);
				console.log(obj.data);
			}
		}

	});
	
	return e

});