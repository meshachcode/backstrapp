define(['Backstrapp'], function (b$) {
	var b$.Module = (function () {
		var myPrivateVar = 0;
		var myPrivateMethod = function (someText) {
			console.log(someText);
		};
		return {
			myPublicVar: "foo",
			myPublicFunction: function (bar) {
				myPrivateVar++;
				myPrivateMethod(bar);
			}
		};
	})();
});
