define(['wrap!backbone'], 	function(Backbone){

	var e = Backbone.Model.extend({
		defaults: {
			name: 'default'
		},

		validation: {
			views: {
				required: false
			}
		},

		/**
			* @method loadHtml
			* @param file, callback
		*/
		loadHtml: function (file, callback) {
			$.get(file, function (response, status, xhr) {
				if (status == 'error') {
					// if data file doesn't exist, trigger navigate:home
					debug.error('There was an error trying to load the file.', xhr.status + " " + xhr.statusText);
					Vent.trigger('navigate:home');
				} else if (status == 'success') {
					// if data file does exist, load it into DataModel.source.data, and set DataModel.source.loaded to true
					// trigger callback
					callback(response);
				}
			});
			return;
		}

	});
	
	return e

});