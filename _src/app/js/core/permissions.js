/** 
	* Backstrapp Permissions.
	* NOTE: is it possible to load these from an external source? 
	* Maybe this should all be handled at the server-level (eventually).
*/
define(['jsonLoad!./permissions.config.json', './rule.model', 'jquery', 'backbone',  './mediator'], 

function (config, Rule, $, Backbone, m) {

	// A permissions structure can check
	// against subscriptions prior to allowing
	// them to clear. This enforces a light 
	// security layer for your application.
	var Permissions = Backbone.Collection.extend({

		mode: {
			subscribe: true,
			publish: true
		},

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
			if (this.isMine(channel, subscriber) && this.mode[request]) {
				var test = true;
			} else if (this.rules[channel] && this.rules[channel][subscriber] && this.mode[request]) {
				var test = this.rules[channel][subscriber][request];
			}
			return test === (undefined) ? false : test;
		}
	});

	return new Permissions();

});