/*
define(["./views/appView", "util/loadCss", "backbone", "underscore", "lib/jquery/jquery.tmpl"], 

function (AppView, loadCss) {

	loadCss("todos");

	var app = new AppView();

	return {};

});
*/


/**
	* ToDo Module
*/
define(['lib/backstrapp/module_new', 'core/facade'], function (mod, f) {
	var Module = new mod();

	Module.extend({
		/*
			* @property autoload
			* this tells the Module super class to call 'start()' on 'initComplete'
		*/
		autoload: true,

		/*
			* @property view
			* this is used by Module.load(), which calls 'process()' as a callback
		*/
		view: 'path/to/your/template.html',
		
		/*
			* @method start
			* this is either called by the super class (autoload),
			* or, you may call it yourself (from the exports object below),
			* or, you can leave it uncalled, and let the facade start / stop it, 
			* based on some outside event
			*
			* the list of subscriptions is basically your module's load / activation / render cycle.
			* 
			* NOTE: eventually, this part will be implied by simply specifying a module:type
			* for now, this makes it easy to override any step in the process with custom methods
		*/
		start: function () {
			// what to do when this function is done
			this.subscribe(this.name, this.events.startComplete, this.loadView);
			// when the view is loaded, try to process the template with this.exports as the context
			this.subscribe(this.name, this.events.loadViewComplete, this.process);
			// with the html now processed, set this.html with it
			this.subscribe(this.name, this.events.processComplete, this.setHtml);
			// with this.html in place, time to activate the module (it won't render otherwise)
			this.subscribe(this.name, this.events.setHtmlComplete, this.activate);
			// now that activation is complete, render
			this.subscribe(this.name, this.events.activateComplete, this.render);

			// this is how to subscribe to another module's event
			this.newEvent('moduleNameEventName');
			this.subscribe(this.name, this.events.moduleNameEventName, this.update);
			
			// start the app!
			this.publish(this.name, this.events.startComplete);
		},

		/*
			* @method update
			* @param param array - this is sent by the 'publish' command from the module you are listening to.
		*/
		update: function (param) {			
		}

	});

	return {
		init: function (item, params) {
			/*
				* bindAll here to allow the module to pass 'autoload:true' to the constructor,
				* and avoid the need for an extra init() call 
			*/
			f.util.bindAll(Module, 'start', 'process');
			return Module._init(item, params);
		}
	};
});