// Accordion Demo
define(['lib/backstrapp/core/jquibs.module.factory.0.1'],

function (ModuleFactory) {

	var config = {
		id: 'somethingelse', 
		header: 'h3', 
		slides: [
			{header: 'slide 1', body: 'AAAAAAA'},
			{header: 'slide 2', body: 'BBBBB'},
			{header: 'slide 3', body: 'CCCCCC'},
			{header: 'slide 4', body: 'DDDDDDD'}
		]
	};

	var Module = new ModuleFactory('accordion', config);

	return Module;

});