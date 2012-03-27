define(['backstrapp/utils/module-activator', 'backstrapp/utils/content-builder', 'backstrapp/core/collections/modules.collection'], 

function (Activator, Builder, ModulesCollection) {

	var App = {
		debugMode: true,
		modules: new ModulesCollection(),
		
		results: {
			/*
				- success: the module was found or loaded, and may now be rendered
					- this should simply fire the RenderReady event for the module,
					and allow the module to 'do it's thang'
			*/
			success: function (result) {
				result.module.init(result.request);
			},

			/*
				- error: the module either doesn't exist, or can't be validated
					- this should check for a debug mode,
					and try to print a friendly error message in the module's div
			*/
			error: function (result) {
				if (App.debugMode) {
					$(result.request.el).html(App.buildResponseMessage('error', result));
				}
			},

			/*
				- promise: something was wrong, I'm trying to fix it, when I know, I'll get back
					- this should check for a debug mode,
					and try to print a friendly loading message in the module's div
			*/
			promise: function (result) {
				console.log('promise', arguments);
			},
		},
		
		buildResponseMessage: function (type, result) {
			console.log('result', result);
			var ret = [];
			ret.push(result[type]);
			ret.push('Module: ' + result.module);
			return ret.join("<hr/>");
		},
		
		moduleLoader: function (request) {
			App.modules.getModule(request, App.processModule);
		},
		
		processModule: function (result) {
			console.log('processModule', result);
			for (var i in App.results) {
				if (result[i]) {
					App.results[i].call(App, result);
				}
			}
		},

		activator: function () {
			Activator.execute(null, App.moduleLoader);
		},
		
		builder: function () {
			Builder.execute();
		}
	}

	return function () {
		App.activator();
		App.builder();
	}
})