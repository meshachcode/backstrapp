/** 
	* Backstrapp Permissions.
*/
define(['jquery', 'backbone'], 

function ($, Backbone) {

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.
	var Permissions = {

		rules: {
			pageModuleRenderComplete: {
				navModule: {
					subscribe: true
				}
			},
			pageModulePagesLoaded: {
				navModule: {
					subscribe: true
				},
				pageModule: {
					publish: true
				}
			},
			// errors
			errorModulePath: {
				testModule: {
					subscribe: true
				},
				errorHandler: {
					publish: true
				}
			}
		},
		
		isMine: function (c, s) {
			return (c.indexOf(s) != -1) ? true : false;
		},

		/**
	    	* @param {string} subscriber Module name
	    	* @param {string} channel Event name
	    */
		validate: function(request, subscriber, channel){
			if (Permissions.isMine(channel, subscriber)) {
				var test = true;
			} else if (Permissions.rules[channel] && Permissions.rules[channel][subscriber]) {
				var test = Permissions.rules[channel][subscriber][request];
			}
			if (!test) {
				console.log('validation failed', arguments);
			}
			return test === (undefined) ? false : test;
		}
	};

	return Permissions;

});