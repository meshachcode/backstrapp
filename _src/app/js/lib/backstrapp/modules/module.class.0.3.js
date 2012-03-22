/*
	* Module Class 0.3
	* (mediator)
	* private and standard module properties and methods
*/
define(['base'], function () {

	var _private = {
		state: {},
		errors: [],
		store: ['autoload', 'name', 'html', 'el', 'view', 'debug', 'active', 'valid', 'visible'],
		renderable: ['active', 'valid', 'visible'],
		
		save: function () {
			for (var i in this.store) {
				this.state[this.store[i]] = this[this.store[i]];
			}
			return this.state;
		},

		isRenderable: function (context) {
			var ret = true;
			for (var i in this.renderable) {
				if (!context[this.renderable[i]]) {
					this.newError('unrenderable', this.renderable[i], context[this.renderable[i]]);
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
	};

	var _public = Base.extend({
		autoload: true,
		name: '',
		html: '',
		view: '',
		el: $('<div></div>'),
		active: true,
		valid: true,
		visible: true,
		debug: {},

		constructor: function (config) {
			this.debug.init = this.set(config);
		},
		
		restore: function (config) {
			this.debug.restore = this.set(config);
			return this;
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
			return (this.public[str] != undefined) ? this.public[str] : {error: 'could not get ' + str};
		},
		
		save: function () {
			return _private.save();
		},

		render: function (el) {
			var dom = (el != undefined) ? el : this.el;
			if (_private.isRenderable(this)){
				$(dom).html(this.html);
			} else {
				$(dom).html(_private.printErrors(_private.errors));
			}
		}

	});

	return _public;

});