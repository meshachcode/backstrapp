/**
 * Backbone-Nested 1.0.3 - An extension of Backbone.js that keeps track of nested attributes
 *
 * http://afeld.github.com/backbone-nested/
 *
 * Copyright (c) 2011-2012 Aidan Feldman
 * MIT Licensed (LICENSE)
 */
Backbone.NestedModel = Backbone.Model.extend({
	constructor: function (a, b) {
		Backbone.Model.prototype.constructor.apply(this, arguments)
	},
	get: function (a, b) {
		b || (b = {});
		var c = Backbone.NestedModel.attrPath(a),
			d = c[0],
			e = Backbone.Model.prototype.get.call(this, d);
		for (var f = 1; f < c.length; f++) {
			d = c[f], e = e[d];
			if (!e) break
		}
		return !b.silent && _.isObject(e) && window.console && window.console.log("Backbone-Nested syntax is preferred for accesing values of attribute '" + a + "'."), e
	},
	has: function (a) {
		var b = this.get(a, {
			silent: !0
		});
		return b !== null && !_.isUndefined(b)
	},
	set: function (a, b) {
		b || (b = {});
		var c = _.deepClone(this.attributes);
		for (var d in a) {
			var e = Backbone.NestedModel.attrPath(d),
				f = Backbone.NestedModel.createAttrObj(e, a[d]);
			this.mergeAttrs(c, f, b)
		}
		return Backbone.Model.prototype.set.call(this, c, b)
	},
	unset: function (a, b) {
		var c = {};
		return c[a] = void 0, this.set(c, b), this
	},
	remove: function (a, b) {
		this.unset(a, b);
		var c = Backbone.NestedModel.attrPath(a);
		if (_.isNumber(_.last(c))) {
			var d = _.initial(c),
				e = this.get(d, {
					silent: !0
				});
			for (var f = 0; f < e.length; f++) e[f] || e.splice(f, 1)
		}
		return this
	},
	toJSON: function () {
		var a = Backbone.Model.prototype.toJSON.apply(this);
		return _.deepClone(a)
	},
	mergeAttrs: function (a, b, c, d) {
		return d || (d = []), _.each(b, function (b, e) {
			e === "-1" && (e = a.length);
			var f = a[e],
				g = d.concat([e]),
				h, i = _.isObject(b) && _.any(b, function (a, b) {
					return b === "-1" || _.isNumber(b)
				});
			i && !_.isArray(f) && (f = a[e] = []);
			if (e in a && _.isObject(b) && _.isObject(f)) f = a[e] = this.mergeAttrs(f, b, c, g);
			else {
				var j = f;
				f = a[e] = b, _.isArray(a) && !c.silent && (h = Backbone.NestedModel.createAttrStr(d), !j && f ? this.trigger("add:" + h, this, f) : j && !f && this.trigger("remove:" + h, this, j))
			}!c.silent && g.length > 1 && (h = Backbone.NestedModel.createAttrStr(g), this.trigger("change:" + h, this, f))
		}, this), a
	}
}, {
	attrPath: function (a) {
		var b;
		return _.isString(a) ? (a = a.replace(/\[\]/g, "[-1]"), b = a.match(/[^\.\[\]]+/g), b = _.map(b, function (a) {
			return a.match(/^\d+$/) ? parseInt(a) : a
		})) : b = a, b
	},
	createAttrObj: function (a, b) {
		var c = this.attrPath(a),
			d;
		switch (c.length) {
		case 0:
			throw "no valid attributes: '" + a + "'";
		case 1:
			d = b;
			break;
		default:
			var e = _.rest(c);
			d = this.createAttrObj(e, b)
		}
		var f = c[0],
			g = _.isNumber(f) ? [] : {};
		return g[f] = d, g
	},
	createAttrStr: function (a) {
		var b = a[0];
		return _.each(_.rest(a), function (a) {
			b += _.isNumber(a) ? "[" + a + "]" : "." + a
		}), b
	}
}), _.mixin({
	deepMerge: function (a) {
		return _.each(_.rest(arguments), function (b) {
			var c, d;
			for (var e in b) c = b[e], d = a[e], e in a && _.isObject(c) && _.isObject(d) ? _.deepMerge(d, c) : a[e] = c
		}), a
	},
	deepClone: function (a) {
		var b = _.clone(a);
		return _.isObject(a) && _.each(a, function (a, c) {
			b[c] = _.deepClone(a)
		}), b
	}
})
