/*
	* Module Class 0.3
	* (mediator)
	* private and standard module properties and methods
*/
define(['base'], function () {

	var ModuleClass = Base.extend({
		autoload: true,
		name: '',
		html: '',
		view: '',
		el: $('<div></div>'),
		active: true,
		valid: true,
		visible: true,
		debug: {},
		state: {},
		errors: [],
		store: ['autoload', 'name', 'html', 'el', 'view', 'debug', 'active', 'valid', 'visible'],
		renderable: ['active', 'valid', 'visible'],
		animation: {time: 100},

		constructor: function (config) {
			this.set(config);
		},
		
		restore: function (config) {
			this.set(config);
		},

		show: function () {
			this.hide();
			if (this.isRenderable()) {
				this.render();
			} else {
				this.render(undefined, this.printErrors(this.errors));
			}
			this.el.fadeIn(this.animation.time);
		},

		hide: function () {
			this.el.hide();
		},

		set: function (obj) {
			var ret = {error: 'error setting obj'};
			for (var i in obj) {
				if (this[i] != undefined) {
					ret.success = (!ret.success) ? {} : ret.success;
					this[i] = obj[i];
					ret.success[i] = this[i];
				} else {
					ret.notset = (!ret.notset) ? {} : ret.notset;
					ret.notset[i] = obj[i];
				}
			}
			if (!ret.notset) {delete ret.error};
			return ret;
		},
		
		get: function (str) {
			return (this[str] != undefined) ? this[str] : {error: 'could not get ' + str};
		},
		
		save: function () {
			for (var i in this.store) {
				this.state[this.store[i]] = this[this.store[i]];
			}
			return this.state;
		},

		render: function (el, html) {
			var d = (el != undefined) ? el : this.get('el');
			var h = (html != undefined) ? html : this.get('html');
			$(d).html(h);
		},
		
		isRenderable: function () {
			var ret = true;
			for (var i in this.renderable) {
				if (!this[this.renderable[i]]) {
					this.newError('unrenderable', this.renderable[i], this[this.renderable[i]]);
					ret = false;
				};
			}
			return ret;
		},
		
		printErrors: function (errors) {
			var ret = [];
			for (var i in errors) {
				ret.push(i + ' : ' + errors[i].msg);
			}
			return ret.join('<br/>');
		},
		
		newError: function (m, c, v) {
			this.errors[m] = {msg: m + ' due to ' + c + ' having value of ' + v, context: c};
		}
	});

	return ModuleClass;

});