define(['underscore'], function (_) {

	var utils = {

		objectifyParams: function (paramStr) {
			var pObj = {}, pArr = [], iArr = [];
			pArr = paramStr.split(',');
			_.each(pArr, function (i) {
				iArr = i.split(':');
				pObj[iArr[0]] = iArr[1];
			});
			return pObj;
		}

	};

	return utils;
});