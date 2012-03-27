define(['handlebars'], function (H) {
	
	var Template = {
		process: function (context, source) {
			console.log('h', H);
			var template = H.compile(source);
			return template(context);
		}
	}
	
	return Template;
	
})