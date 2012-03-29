define(['jquery', 'backstrapp/modules/template.module.0.1'], function ($, Module) {

	var Tabs = Module.extend({
		render: function () {
			Module.prototype.render.call(this);
		    $('#' + this.model.get('id')).tabs();
		}
	});

	return Tabs;
});