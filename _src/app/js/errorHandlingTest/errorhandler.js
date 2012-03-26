define(function(){
	
	return function(errObject) {
		requireType = errObject.requireType; 
        requireModules = errObject.requireModules.trim().split(' ');
        console.error('EH', requireType, requireModules);
	};
	
});