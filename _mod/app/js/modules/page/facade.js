define(["./mediator" , "./permissions" ], function (mediator, permissions) {

	var facade = facade || {};

	facade.subscribe = function(subscriber, channel, callback){
		if(permissions.validate(subscriber, channel)){
			mediator.subscribe( channel, callback );
		}
	}

	facade.publish = function(subscriber, channel, params){
		if(permissions.validate(subscriber, channel)){
			mediator.publish( channel, params );
		}
	}

	return facade;

});