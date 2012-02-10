/*
	* The Box Module tests how modules work in Backstrapp
	*
	* TODO: build an example using a red and blue box. 
	* There will be 3 distinct modules. 
	* 	- Box - is the app module, which is directed by the url /:app
	*	- RedBox - is a submodule, and all of it's code is in /modules/box/redbox/
	*		- when rendered, it draws a red box, which is clickable, and sends a message to the DataModel ("Hello. I'm red.")
	* 	- BlueBox - is a submodule, and all of it's code is in /modules/box/bluebox/
	*		- when rendered, it draws a red box, which is clickable, and sends a message to the DataModel ("Hi. I'm blue.")
	* 
	* The Box module 'listens' for 'view' events. When they're fired, the Box module toggles the corresponding box to render.
	* 	- /#/box/red will toggle the display of the red box in it's container
	* 	- /#/box/blue will toggle the display of the blue box in it's container
	* 
	* The Box module 'listens' for 'message:' events to be triggered, which never go to the router.
	* Instead, the message (which is triggered by clicking one of the boxes), 
	* should be displayed by both the box clicked, and the parent message box. That event should also trigger for the other 
	* box to change color.
	* 
	* Example: 
	* 	- User navigates to /#/box
	* 	- On load, the user sees 2 boxes. One blue, one red. 
	* 	- Under each box, there's a link that says 'toggle box'.
	* 		- When clicking the link, the box is either hidden or shown, and the url is updated to /#/box/red or /#/box/blue
	* 	- When clicking the box itself, a message appears on the box itself, and in a primary window above both boxes.
	* 
	* @module Box
	* @requires $, Handlebars, _, Backbone
	* @namespace Box
*/
define([
  'jQuery',
  'Handlebars',
  'Underscore',
  'Backbone',
  'models/data.model',
  'events/vent',
  'text!templates/box/view.html'
], function($, Handlebars, _, Backbone, DataModel, Vent, BoxTemplate){
	/*
		* @class BoxModel
		* @extends Backbone.Model
	*/
	var BoxModel = Backbone.Model.extend({
		/*
			* @property defaults
		*/
		defaults: {
			msg				: 	"hey there",
			pageData: {
				"url"		:	"box",
				"title"		:	"Box",
				"type"		:	"app",
				"name"		:	"box",
				"visible"	:	true
			}
		}
	});

	/*
		* @class BoxView
		* @extends Backbone.View
	*/
	var BoxView = Backbone.View.extend({
		/*
			* @property model
		*/
		model: new BoxModel(),

		/*
			* @method initialize
		*/
		initialize: function () {
			DataModel.set({ newpage: this.model.get('pageData') });
			Vent.bind('currentapp:box', this.render, this);
		},
		
		/*
			* @method render
		*/
		render: function () {
			debug.debug('BoxView.render()');
			DataModel.set({ pageHtml: BoxTemplate });
		}		
	});

	return new BoxView();
});