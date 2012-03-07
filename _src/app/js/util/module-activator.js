/*
	Backstrapp Module Activator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
*/

define(['jquery', 'util/loadcss'], function ($, loadcss) {

	var objectifyParams = function (paramStr) {
		var pObj = {},
			pArr = [],
			iArr = [];
		pArr = paramStr.split(',');
		$.each(pArr, function (k, v) {
			iArr = v.split(':');
			pObj[iArr[0]] = iArr[1];
		});
		return pObj;
	}

	var e = {};

	e.execute = function (element) {

		$("[data-module-cssonly]", element).each(function () {
			console.log('loading css');
			var item = $(this),
				css = item.data("module-cssonly");
			loadcss(css, item);
		});

		$("[data-module]", element).each(function () {
			var item = $(this),
				module = item.data("module"),
				parameters = objectifyParams(item.data("module-parameters"));

			require([module], function (mod) {
				console.log('Module Loaded:', mod, module, parameters);
				if (mod.css) {
					loadcss(mod.css, item);
				} else {
					item.css('visibility', 'visible');
				}
				if (mod.init) {
					mod.init(item, parameters);
				}
			});
		});

	};

	return e;

});