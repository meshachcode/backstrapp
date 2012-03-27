define(function () {
	var Debug = {

		messages: {
			error: {
				moduleLoad: 'ERROR: Module either does not exist or cannot be loaded',
				badRequest: 'ERROR: Invalid Module Request'
			},
			success: {
				moduleLoad: 'SUCCESS: Module was found and loaded, and may now be rendered',
			},
			promise: {
				moduleLoad: 'PROMISE: Something went wrong. Restarting the Module. Stay tuned...'
			}
		},
		
		/*
			* @method buildResponseObject
			* construct return object for all module requests
		*/
		buildResponseObject: function (statusStr, messageType, requestObj) {
			var ret = {
				request: requestObj,
				module: requestObj.instance
			};
			ret[statusStr] = this.messages[statusStr][messageType];
			return ret;
		}
	}
	
	return Debug;
})