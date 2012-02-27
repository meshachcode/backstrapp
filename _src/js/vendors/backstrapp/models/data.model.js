define(['jQuery', 'Underscore', 'vendors/backstrapp/models/backstrapp.model'], function ($, _, b$Model) {
	/*
		* @class DataModel
		* @extends Backbone.Model
	*/
	var DataModel = b$Model.extend({
		defaults: {
			module: null,
			request: {
				type: 'get',
				format: 'html',
				params: {
					module: null,
					view: null,
					slug: null
				}
			},
			data_sources: {
				meta: {
					loaded: false,
					file: 'json/default.json'
				},
				pages: {
					loaded: false,
					file: 'json/pages.json'
				}
			}
		},
		validation: {
			request: 'checkLoadedData'
		},
/* 		modules: ModulesCollection, */
		/*
			* @method initialize
		*/
		initialize: function () {
			_.bindAll(this, 'checkRequest');
			this.bind('change:newpage', this.addPage, this);
			this.bind('loaded:pages', this.processRequest, this);
		},
		/*
			* @method loadData
			* @param file, callback
		*/
		loadData: function (file, callback) {
			$.getJSON(file, function (json) {
				callback(json);
			})
		},
		loadDataToModel: function (data_source, field, callback) {
			var $this = this;
			if (this.get(field)) {
				return callback();
			} else {
				this.loadData(this.get('data_sources')[data_source].file, function (json) {
					var obj = {};
					obj[field] = json;
					$this.set(obj);
					if (typeof callback == 'function') {
						callback();
					}
				});
			}
		},
		getDataByField: function (field, key, val) {
			var results, options = this.get(field);
			results = _.filter(options, function (obj, i) {
				if (obj[key] == val) {
					obj.id = i;
					return obj;
				};
			});
			return results;
		},
		/*
			* @method checkLoadedData
		*/
		checkLoadedData: function (request) {
			if (!this.get('pages')) {
				return { type: 'data', msg: 'Data Not Loaded' };
			} else {
				return this.checkRequest(request);
			}
		},
		/*
			* @method checkRequest
		*/
		checkRequest: function (request) {
			var page, module;
			page = _.find(this.get('pages'), function (page) {
				return page.slug == request.params.slug;
			});
			if (typeof page != 'undefined' && page) {
				request.current = {};
				request.current.page = page;
				model = this.modules.findBy('name', page.module);
				if (typeof model != 'undefined' && model) {
					request.current.model = model;
					this.trigger('change:request.params');
					return false;
				} else {
					return { type: 'module', msg: 'Module Not Found' };
				}
			}
			return { type: 'page', msg: 'Page Not Found' };
		}
	});
	return new DataModel();
}); //request validation: check loaded pages, load them if not, check slug against all pages, if not found trigger error. App.js listens for valid Request change, sets
