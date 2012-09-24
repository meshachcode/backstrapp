/*
	Backstrapp Module Activator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
*/

define(['jquery', 'loadcss'], function ($, loadcss) {

	var Activator = {
		loadingMessage: '<p>Loading Module...</p>',
		objectifyParams: function (paramStr) {
			var pObj = {},
				pArr = [],
				iArr = [];
			if (paramStr == undefined && paramStr == null) {
				return pObj;
			}
			pArr = paramStr.split(',');
			$.each(pArr, function (k, v) {
				iArr = v.split(':');
				pObj[iArr[0]] = iArr[1];
			});
			return pObj;
		},

		postProcess: function (mod) {
			if (mod.css) {
				loadcss(mod.css);
			}
		},

		execute: function (element, callback) {
			element = (element == null) ? undefined : element;
			$("[data-module-cssonly]", element).each(function () {
				console.log('loading css');
				var item = $(this),
					css = item.data("module-cssonly");
				loadcss(css, item);
			});

			$("[data-module]", element).each(function () {
				var request,
					item = $(this),
					name = item.attr('id'),
					module = item.data("module"),
					params = Activator.objectifyParams(item.data("module-parameters"));
				item.html(Activator.loadingMessage);
				request = {
					name: name,
					el: item,
					path: module,
					arg: params
				};
				if (typeof callback == 'function') {
					callback(request);
				}
			});
		}	
	}

	return Activator;
});