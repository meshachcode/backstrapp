require.config({
	paths: {
		// require js plugins
		order: 				'../vendors/require/plugins/order',
		text:				'../vendors/require/plugins/text',
		font:				'../vendors/require/plugins/font',
		depend:				'../vendors/require/plugins/depend',
		json:				'../vendors/require/plugins/json',
		// vendors and dependencies
		vendors:	 		'../vendors',
		loader:				'../vendors/loader',
		jQuery:				'../vendors/jquery/jquery',
		Handlebars:			'../vendors/handlebars/handlebars',
		Underscore:			'../vendors/underscore/underscore',
		Backbone:			'../vendors/backbone/backbone',
		Backstrapp:			'../vendors/backstrapp/backstrapp',
		// shortcuts for later
		templates:			'../../html/templates',
		static:				'../../html/static',
		data:				'../../json'
	}
});
require([
	'modules/app',
], function(App){
	return new App();
});