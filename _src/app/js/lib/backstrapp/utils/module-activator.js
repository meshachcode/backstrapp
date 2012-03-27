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

	e.execute = function (element) {
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
				el: item,
				mod: module,
				arg: params
			};
			/*
				* TODO: this should simply ask the ModulesCollection for the module.
				* send request, callback, and context
				* on callback, it will receive an object:

				- success: the module was found or loaded, and may now be rendered
					- this should simply fire the RenderReady event for the module,
					and allow the module to 'do it's thang'

				- error: the module either doesn't exist, or can't be validated
					- this should check for a debug mode,
					and try to print a friendly error message in the module's div

				- promise: something was wrong, I'm trying to fix it, when I know, I'll get back
					- this should check for a debug mode,
					and try to print a friendly loading message in the module's div
			*/
			/*
				// ... THE OLD WAY...
				facade.getModule(request);
			*/
		});
	};
	return e
});