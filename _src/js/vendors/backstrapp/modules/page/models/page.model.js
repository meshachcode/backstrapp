define([
  'Backstrapp'
], function(Backstrapp){

	var PageModel = Backstrapp.Model.extend({
		defaults: {
			name:	'page',
			views: 	{
				static: {
					view		:		'static',
					instance	:		{}
				},
				template: {
					view		:		'template',
					instance	:		{}
				}
			}
		}
	});

	return PageModel;
});