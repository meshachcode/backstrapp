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
  'libs/backstrapp/modules/backstrapp.module',
  'libs/backstrapp/models/backstrapp.model',
  'libs/backstrapp/views/backstrapp.view'
], function($, _, Backbone, BackstrappModule, BackstrappModel, BackstrappView){

	/**
		* @class Backstrapp
	*/
	var Backstrapp = {};

	Backstrapp.Model = BackstrappModel;

	Backstrapp.Collection = Backbone.Collection.extend({});

	Backstrapp.View = BackstrappView;

	Backstrapp.Module = BackstrappModule;

	return Backstrapp;
});