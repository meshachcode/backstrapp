/*

	This is dumb.
	Not all Backbone objects need these plugins. 
	Instead, the Backstrapp Objects should extend Backbone, 
	and utilize the plugins they need on a case-by-case basis.
	This script should eventually be removed completely,
	and simply let wrap!backbone point directly to backbone-min

*/

define([
	'order!vendors/backbone/backbone-min',
	'order!vendors/backbone/backbone.query',
	'order!vendors/backbone/backbone.validation',
	'order!vendors/backbone/backbone.actAs.Mementoable'
],
function () {
	_.extend( Backbone.Model.prototype, Backbone.Validation );
	_.extend( Backbone.Model.prototype, Backbone.actAs.Mementoable );
	return Backbone
});