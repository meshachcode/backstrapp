// Filename: router.js
define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){

  var AppRouter = Backbone.Router.extend({

    routes: {
      // Default
      '*actions': 'defaultAction'
    },

    defaultAction: function(actions){
      // We have no matching route, lets display the home page 
    }

  });

  var initialize = function(){

    var app_router = new AppRouter;
    Backbone.history.start();

  };

  return { 
    initialize: initialize
  };

});