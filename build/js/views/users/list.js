define(["jQuery","Underscore","Backbone","text!templates/users/list.html"],function(a,b,c,d){var e=c.View.extend({el:a("#page"),initialize:function(){},render:function(){var a={},c=b.template(d,a);this.el.html(c)}});return new e})