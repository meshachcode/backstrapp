/*
	* Module Class 0.3
	* (facade)
		f.defaults: {
			autoload: true,
			name: '',
			el: '',
			html: '',
			view: '',
			animation: {},
			debug: {},
			errors: {},
			events: {}
		}
		f.init( {el, name, events, autoload, view} ) // initEvents(), return util.extend(f.defaults, obj)
		f.set( {obj} ) // return util.extend(f.defaults, obj)
		f.get( 'key' ) // return this[key]
		f.state: {
			valid: true,
			active: true,
			visible: true
		}
		f.show() // if f.state.all { render() }
		f.hide()
*/
define(['./module.class.0.3'], function (ModuleClass) {

	var Module = ModuleClass.extend({
		constructor: function(config) {
			this.base(config);

			if (this.autoload) {
				this.render(this.el);
			}
		},
		
		restore: function (config) {
			if (this.autoload) {
				this.render(this.el);
			}
			return this.base(config);
		}
	});

	return Module;

});