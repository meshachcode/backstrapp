define(['underscore', 'jquery'], function (_, $) {

    _.mixin({
		/**
         * Always returns the fn within the context
         * @param {mediatorect} fn Method to call
         * @param {mediatorect} context Context in which to call method
         * @returns {mediatorect} Fn with the correct context
        */
    	method: function (fn, context) {
/*     		console.log('method', arguments); */
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
		},
		
		debug: function () {
			console.warn('<Debug ---------------------');
			for (var i in arguments) {
				console.warn('--- arg ' + i, arguments[i]);
			}
			console.warn('-------------------- /Debug>');
		},

        isIn: $.inArray,
		
		has: function(obj, key) {
			return hasOwnProperty.call(obj, key);
		},

        decamelize: function (camelCase, delimiter) {
            delimiter = (delimiter === undefined) ? "_" : delimiter;
            var ret = camelCase.replace(/([A-Z])/g, delimiter + '$1').toLowerCase();
            if (ret.substr(0, 1) == delimiter) {
            	ret = ret.substr(1);
            }
            return ret;
        },        

        /**
         * @link <a href="https://gist.github.com/827679">camelize.js</a>
         * @param {string} str String to make camelCase
         */
        camelize: function (str, lowerFirst) {
        	lowerFirst = (lowerFirst === undefined) ? false : lowerFirst;
        	var reg = /(?:^|[-_])(\w)/g;
        	if (lowerFirst) {
        		reg = /[-_]([a-z])/ig;
        	}
            return str.replace (reg, function (delimiter, c) {
                return c ? c.toUpperCase () : '';
            });
        },

        parseJson: function (json) {
            return $.parseJSON(json);
        }
	});

	return _;

});