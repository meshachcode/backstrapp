define(['handlebars'], function (H) {
	
	var Template = {
		process: function (context, source) {
			var template = H.compile(source);
			return template(context);
		}
	}
	
	return Template;
	
})