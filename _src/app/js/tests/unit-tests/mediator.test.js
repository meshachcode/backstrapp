define(['jsonLoad!./config.test.json', 'core/mediator'], function (conf, m) {
	return {

		RunTests: function () {
			module('Mediator');
			var testObj = { test: true };
			var decamStr = 'this_is_a_test';
			var camStr = 'ThisIsATest';

			test('utils', 5, function () {
				ok(m.util.has( testObj, 'test' ), 'm.util.has can find a key' );
				ok(!m.util.has( testObj, 'else' ), 'm.util.has does not find illegal key' );
				equal(m.util.camelize(decamStr), camStr, 'm.util.camelize converts ' + decamStr + ' to ' + camStr );
				equal(m.util.decamelize(camStr), decamStr, 'm.util.decamelize converts ' + camStr + ' to ' + decamStr );
				equal(m.util.decamelize(camStr, '-'), 'this-is-a-test', 'm.util.decamelize converts ' + camStr + ' to this-is-a-test' );
			});

			test('config', 3, function () {
				m.config = conf;
				var testArray = [
					{ o: 'pages', k: 'id', v: 'testOne', 	e: true, 	m: 'm.getConfigObj returned testOne properly' },
					{ o: 'pages', k: 'id', v: 'testTwo', 	e: true, 	m: 'm.getConfigObj returned testTwo properly' },
					{ o: 'pages', k: 'id', v: 'testThree', 	e: false, 	m: 'm.getConfigObj properly returned false on testThree'}
				];

				for (var i in testArray) {
					QUnit.stop();
					m.getConfigObj(testArray[i].o, testArray[i].k, testArray[i].v, function (result) {
						if (!testArray[i].e) {
							deepEqual(result, false, testArray[i].m);
						} else {
							deepEqual(result, conf.pages[i], testArray[i].m);
						}
						QUnit.reset();
						QUnit.start();
					});
				}
			});
		}
	};
});