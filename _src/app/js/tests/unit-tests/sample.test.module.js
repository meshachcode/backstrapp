define(["my/moduletotest1", "my/moduletotest2"], function (moduletotest1, moduletotest2) {
	return {
		RunTests: function () {
			test("mod1test", function () {
				QUnit.stop();
				moduletotest1.ajaxyMethod(arg, function (result) {
					deepEqual(result, matchExpression);
					QUnit.start();
				});
			});
			test("mod2test", function () {
				QUnit.stop();
				moduletotest2.ajaxyMethod(arg, function (result) {
					equal(result, matchExpression);
					QUnit.start();
				});
			});
		}
	};
});