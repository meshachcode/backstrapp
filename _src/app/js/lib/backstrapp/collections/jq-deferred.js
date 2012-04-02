require(
{
	paths: {
		jquery: 'lib/jquery/jquery-min',
		underscore: 'lib/underscore/underscore.1.3.1',
		handlebars: 'lib/handlebars/handlebars-min',
	}
}, 

['jquery', 'underscore', 'handlebars'], 

function () {
	var sources = [
		{json: 'app/json/tmpTestA.json', tmp: 'app/html/app/parts/nav.html'},
		{json: 'app/json/tmpTestB.json', tmp: 'app/html/app/parts/nav.html'}
	];

	// setup a generic fileCache object
	var fileCache = {};
	var templateCache = {};

	// handle adding new elements to the fileCache, resolve the deferred object
	function addToFileCache (o, d) {
		o.count = 0;
		fileCache[o.path] = o;
		d.resolve(o);
	}

	function getFile(path){
		// if the fileCached file exists, return it wth an incremented count
		if (fileCache[path]) {
			fileCache[path].count++;
			return fileCache[path];
		}
		// create a deferred object to handle listens
	    var d = $.Deferred();
	    // get the file, and add it to the fileCache
	    $.get(path).done(function(p){
			var o = {
				result: p,
				path: path
			};
			addToFileCache(o, d);
	    }).fail(d.reject);
	    // return the promise object, so everyone gets to hear about this, even if they come in late...
	    return d.promise();
	}

	// process the data...
	function process (data, tmp) {
		var template = Handlebars.compile(tmp.result);
		var html = template(JSON.parse(data.result));
		return html;
	}

	function getFiles (source) {
		console.count();
		var id = JSON.stringify(source);
		if (templateCache[id]) {
			console.log('returning cached template', templateCache[id], source);
			templateCache[id].count++;
			return templateCache[id];
		} else {
			console.log('loading template', source);
			$.when(getFile(source.json), getFile(source.tmp), source, id).done(function (data, tmp, source, id) {
				templateCache[id] = {};
				templateCache[id].html = process(data, tmp);
				templateCache[id].count = 0;
			});
		}
	}

	// setup an iterator to allow progressive delay
	var i = 0;
	for (var j in sources) {
		_(3).times(function () {_.delay(getFiles, 10 * i++, sources[j])});
	}

});