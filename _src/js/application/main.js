require.config({
  	paths: {

		// require js plugins
		order: 				'../vendors/require/plugins/order',
		text:				'../vendors/require/plugins/text',
		font:				'../vendors/require/plugins/font',
		depend:				'../vendors/require/plugins/depend',
		json:				'../vendors/require/plugins/json',
		wrap:				'../vendors/require/plugins/wrap',
		use:				'../vendors/require/plugins/use',

		// vendors and dependencies
		vendors:	 		'../vendors',
		loader:				'../vendors/loader',
		debug:				'../vendors/debug/debug',
		jquery:				'../vendors/jquery/jquery',
		handlebars:			'../vendors/handlebars/handlebars',
		// underscore doesn't need a wrapper because of it's AMD upgrade. 
		// Check the wrap!underscore config below for more
		underscore:			'../vendors/underscore/underscore-min',
		backbone:			'../vendors/backbone/backbone-min',
		backstrapp:			'../vendors/backstrapp/backstrapp',
		
		// shortcuts for later
		templates:			'../../html/templates',
		static:				'../../html/static',
		data:				'../../json'
	},
	
	wrapJS: {
		backbone: {
			deps: ["wrap!underscore", "debug"],
			attach: "Backbone"
		},

		underscore:	{
			deps: ["wrap!jquery"],
			attach: "_"
		},

		jquery:	{
			attach: "$"
		}		
	},
	
	use: {
		backstrapp: {
			deps: ["wrap!backbone"],
			attach: function (Backstrapp) {
				return Backstrapp;
			}
		}		
	}
});

require([
	'json!./app.config.json',
	'app'
], function(Config, App){

	console.time('router');
	window.backstrappSite = new App(Config);

});