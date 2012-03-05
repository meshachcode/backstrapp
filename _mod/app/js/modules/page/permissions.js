define([], function () {

	// Permissions

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.

	var permissions = {

		renderDone:{
			home:true,
			about:true
		}

	};

	permissions.validate = function(subscriber, channel){
		var test = permissions[channel][subscriber];
		console.log(test);
		return test===undefined? false: test;
	};


	return permissions;

});