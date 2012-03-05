define(['util/underscore', 'util/content-builder', 'util/module-activator', './facade.js'],
function (_, builder, activator, facade) {

	var el, html = '';
	var page = {
		pagesDir: 'html/test/',

		init: function (params) {
			facade.subscribe('home', 'renderDone', this.render);
			this.start(params);
		},

		start: function (params) {
			var paramObj = page.objectifyParams(params);
			this.loadPage(this.pagesDir + paramObj.page + '.html', function (response) {
				html = response;
				facade.publish('renderDone', 'home');
			});
		},

		loadPage: function (page, callback) {
			console.log('page', page);
			require(['text!' + page], callback);
		},
		
		objectifyParams: function (paramStr) {
			var pObj = {}, pArr = [], iArr = [];
			pArr = paramStr.split(',');
			_.each(pArr, function (i) {
				iArr = i.split(':');
				pObj[iArr[0]] = iArr[1];
			});
			return pObj;
		},
		
		render: function () {
			console.log('render!');
			el.html(html);
		    builder.execute(el);
		    activator.execute(el);
		}
		
	};

	return {
		init: function (item, params) {
			el = item;
			page.init(params);
		}
	};
});