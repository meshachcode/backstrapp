define(['backbone', './msg.model', 'backstrapp/core/facade'], function (Backbone, Msg, f) {

	var MsgsCollection = Backbone.Collection.extend({
		msgs: [],
		msgsLoaded: false,
		model: Msg,
		url: "https://api.mongolab.com/api/1/databases/test/collections/msgs?apiKey=4f67b8c4e4b0145e2b31d0d1",

		initialize: function () {
			f.util.bindAll(this, 'getMsg', 'getMsgs');
		},

		getMsgs: function () {
			if (this.msgs.length == 0){
				for (var i in this.models) {
					this.msgs.push(this.models[i].attributes);
				}
			}
			return this.msgs;
		},

		getMsg: function (name, callback) {
			var msgs = this.getMsgs();
			console.log('collection getMsg', name, msgs);
			for (var i in msgs) {
				if (msgs[i].name == name) {
					console.log('found it!', msgs[i]);
					callback(msgs[i]);
				}
			}
		}
	});

	return new MsgsCollection();

});