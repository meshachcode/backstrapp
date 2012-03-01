require.config({
  	paths: {

		// require js plugins
		order: 				'../vendors/require/plugins/order',
		text:				'../vendors/require/plugins/text',
		font:				'../vendors/require/plugins/font',
		depend:				'../vendors/require/plugins/depend',
		json:				'../vendors/require/plugins/json',
		use:				'../vendors/require/plugins/use',
		wrap:				'../vendors/require/plugins/wrap',

		// vendors and dependencies
		vendors:	 		'../vendors',
		loader:				'../vendors/loader',
		debug:				'../vendors/debug/debug',
		jquery:				'../vendors/jquery/jquery',
		handlebars:			'../vendors/handlebars/handlebars',
		// underscore doesn't need a wrapper because of it's AMD upgrade. 
		// Check the wrap!underscore config below for more
		underscore:			'../vendors/underscore/underscore-min',
		backbone:			'../vendors/backbone/backbone',
		backstrapp:			'../vendors/backstrapp/backstrapp',

		// shortcuts for later
		templates:			'../../html/templates',
		static:				'../../html/static',
		data:				'../../json'
	},
	
	wrapJS: {
		backbone: {
			deps: ["wrap!underscore", "debug"], //an array of the script's dependencies
			attach: function () {
				var Backbone = this.Backbone;
				delete this.Backbone;
				return Backbone;
			}
		},

		// note that Underscore is a function call. This instantiates a local _ object, 
		// allowing us to destroy the global one.
		underscore:	{
			deps: ["wrap!jquery"],
			attach: function () {
				var _ = this._({});
				delete this._;
				return _;
			}
		},

		jquery:	{
			attach: function () {
				var $ = this.$;
				delete this.$;
				return $;
			}
		}
	}
});

require([
	'json!./app.config.json',
	'app'
], function(Config, App){

	console.time('router');
	window.backstrapp = new App(Config);

});