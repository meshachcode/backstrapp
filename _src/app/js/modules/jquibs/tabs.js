// Accordion Demo
define(['lib/backstrapp/jquibs.module.factory.0.1'],

function (ModuleFactory) {

	var config = {
		id: 'jquibTabs',
		slides: [
			{header: 'Slide A', body: 'AAAAAAA', id: 'slideA'},
			{header: 'Slide B', body: 'BBBBBBB', id: 'slideB'},
			{header: 'Slide C', body: 'CCCCCCC', id: 'slideC'},
			{header: 'Slide D', body: 'DDDDDDD', id: 'slideD'}
		]
	};

	var Module = new ModuleFactory('tabs', config);

	return Module;

});