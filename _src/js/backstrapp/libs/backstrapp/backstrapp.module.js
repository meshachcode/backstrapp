/**
	* The Backstrapp Module is intended to be a Super-Class, alla Backbone.
	* The idea is to create an Object Model which can be extended,
	* inheriting handle auto-magic methods for routing, Vent / DataModel conversations, etc...
	* @module Backstrapp
	* @requires $, _, Backbone, DataModel, Vent
*/
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'libs/backstrapp/models/backstrapp.model'
], function($, _, Backbone, BackstrappModel){

	/**
		* @class Backstrapp
	*/
	var Backstrapp = {};

	Backstrapp.Model = BackstrappModel;

	Backstrapp.View = Backbone.View.extend({});

	Backstrapp.Module = Backbone.View.extend({ model: new Backstrapp.Model() });

	return Backstrapp;

});