define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($, _, Backbone){
	/**
		* @class ModulesCollection
		* @extends Backbone.QueryCollection
	*/
	var ModulesCollection = Backbone.QueryCollection.extend({            
            findBy: function(field, value){
                var module =  _.find(this.models, function(module){
                        return module.get('model').get(field) == value;
                    }, this);
                
                return module.get('model');
            }            
        });

	return new ModulesCollection();
});
