define(['underscore'], function (_) {

    _.mixin({
		/**
         * Always returns the fn within the context
         * @param {mediatorect} fn Method to call
         * @param {mediatorect} context Context in which to call method
         * @returns {mediatorect} Fn with the correct context
        */
    	method: function (fn, context) {
            return $.proxy(fn, context);
	    },

        hasAllKeys: function (obj, arr) {
        	var result = true;
        	for (var i in arr) {
        		if (obj[arr[i]] == undefined) {
        			result = false;
        		}
        	}
			return result;
		}
	});

	return _;

});