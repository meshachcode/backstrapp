define([
  'jQuery',
  'Backstrapp',
  'models/data.model',
  'events/vent'
], function($, Backstrapp, DataModel, Vent){

	/**
		* @class AppModel
		* @extends Backstrapp.Model
	*/
	var AppModel = Backstrapp.Model.extend({
		defaults: {
			name:		'backstrapp',
			file: 		'json/pages.json'
		},

		/*
			* @method handlePageRequest
		*/
		handlePageRequest: function () {
			var page = DataModel.get('page');
			debug.debug('App.Model handlePageRequest()', page);			

			var i, models = this.modules.models;

			for ( i in models ) {
				var model = models[i].get('model');

				if (model.get('name') == page.type) {
					debug.debug('MATCH', models[i].get('model'));
					model.set({ current: page }, {
						error: function (model, error) {
							debug.debug('router error', model, error);
						}
					});
				}
			}
		},

		/**
			* @method findPage
		*/
/*
		findPage: function () {
			var page;
			if ( page = DataModel.itemExists(DataModel.get('requestedPage'), DataModel.get('data').pages) ) {
				DataModel.set({ currentPage: page });
				Vent.trigger('pagetype:' + page.type);
			} else {
				Vent.trigger('navigate:home');
			}
		},
*/

		/**
			* @method loadData
		*/
		loadData: function () {
			$.getJSON(this.get('file'), function (json) {
				var pages;
				pages = DataModel.get('pages');
				for ( i in pages ) {
					json.pages.push(pages[i]);
				}
				DataModel.set({ data: json });
			});
		}

		/**
			* @method loadPage
		*/
/*
		loadPage: function () {
			$.get(DataModel.get('currentPage').file, function (html) {
				DataModel.set({pageHtml: html});
				Vent.trigger('render:page')
			});
		}
*/
		
	});
	
	return AppModel;
});