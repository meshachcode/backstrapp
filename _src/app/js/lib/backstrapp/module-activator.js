/*
	Backstrapp Module Activator.
	Drawn on heavily from Addy Osmani's 'Aura' code.
*/

define(['jquery', 'util/loadcss', 'core/facade'], function ($, loadcss, f) {

	var objectifyParams = function (paramStr) {
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
/* 				console.log('Module Loaded:', mod, module, parameters); */
				if (mod.css) {
					loadcss(mod.css, item);
				} else {
					item.css('visibility', 'visible');
				}
				if (mod.init) {
					var m = mod.init(item, parameters);
					f.registerModule(m);
					delete m;
					delete mod;
/* 					console.log('module init', m, mod, f.modules) */
				}
			});
		});
/* 		console.log('e.execute just ran', e); */
	};
	

	return e;

});