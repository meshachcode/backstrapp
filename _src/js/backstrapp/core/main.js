require.config({
  paths: {
    loader: 		'../libs/backbone/loader',
    jQuery: 		'../libs/jquery/jquery',
    Handlebars: 	'../libs/handlebars/handlebars',
    Underscore: 	'../libs/underscore/underscore',
    Backbone: 		'../libs/backbone/backbone',
    Backstrapp: 	'../libs/backstrapp/backstrapp',
    backstrapp:		'../libs/backstrapp/',
    templates: 		'../../../../html',
    json: 			'../../../../json',
    views:			'../views',
    models:			'../models',
    collections:	'../collections',
    modules:		'../modules',
    libs:			'../libs',
    events:			'../events'
  }
});

require([

/*   * Load our app module and pass it to our definition function */
  '../app',
  'libs/debug',

/*
  * Some plugins have to be loaded in order due to their non AMD compliance
  * Because these scripts are not "modules" they do not pass any values to the definition function below
*/
  'order!libs/jquery/jquery-min',
  'order!libs/handlebars/handlebars-min',
  'order!libs/underscore/underscore-min',
  'order!libs/backbone/backbone-min',
  'order!libs/backstrapp/backstrapp.unminified'

], function(App){

/*
  * The "app" dependency is passed in as "App"
  * Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
*/
  var app = new App();
});