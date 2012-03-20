/*
	Backstrapp Module Activator.
	Drawn on heavily from Addy Osmani's 'Aura' code.

	TODO: refactor the activator object with pub/priv in mind. THINK TDD!!
			- NOTE: the tight-coupling with facade isn't advised. Think through this.
*/

define(['jquery', 'loadcss', 'core/facade'], function ($, loadcss, facade) {
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

	var postProcess = function (mod) {
		if (mod.css) {
			loadcss(mod.css);
		}
	}

	var e = {};

	e.execute = function (element, callback) {
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
				params = objectifyParams(item.data("module-parameters"));
			request = {
				name: name,
				dom: item,
				mod: module,
				arg: params
			};
			facade.getModule(request);
		});
	};
	return e
});