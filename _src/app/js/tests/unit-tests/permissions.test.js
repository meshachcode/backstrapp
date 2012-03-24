define(['../../core/permissions'], function (permissions) {
	return {

		RunTests: function () {
			module('Permissions');

			var rules = {
				module:['testModule1'],
				event:['init', 'render'],
				state:['ready', 'complete'],
				request:['publish']
			},
			expected = {
				testModule1InitReady : { 
					testModule1: { 
						publish: true 
					} 
				},
				testModule1InitComplete : { 
					testModule1: { 
						publish: true 
					} 
				} ,
				testModule1RenderReady : { 
					testModule1: { 
						publish: true 
					} 
				},
				testModule1RenderComplete : { 
					testModule1: { 
						publish: true 
					} 
				} 
			},
			concated = [
				'init_ready',
				'init_complete',
				'render_ready',
				'render_complete'
			],
			camelized = [
				'InitReady',
				'InitComplete',
				'RenderReady',
				'RenderComplete'
			];
			permissions.rules = {};
			permissions.defaultRules = rules;

			test('permissions.validate', 4, function () {
				permissions.rules = { 'testModule1InitReady' : { 'testModule1': { 'publish': true } } };
				var request = 'publish', subscriber = 'testModule1', channel = 'testModule1InitReady';
				ok(permissions.validate(request, subscriber, channel), 'validate properly runs with correct params sent');
				ok(!permissions.validate('subscribe', subscriber, channel), 'validate fails with bad request');
				ok(!permissions.validate(request, 'testModule2', channel), 'validate fails with bad subscriber');
				ok(!permissions.validate(request, subscriber, 'testModule2InitReady'), 'validate fails with bad channel');
			});

			test('permissions.newRule', function () {
				var channel = 'testModuleEvent', rule = {testModule: {subscribe: true}};
				deepEqual(permissions.newRule(channel, rule), rule, 'rule created properly');
				ok(!permissions.newRule(channel, 'someRule'), 'rule must be an object');
			});

			test('permissions.concatArrays', 2, function () {
				deepEqual(permissions.concatArrays(rules.event, rules.state), concated, 'concatArrays properly runs');
				deepEqual(permissions.concatArrays(['one', 'two'], ['a', 'b'], '-'), ['one-a', 'one-b', 'two-a', 'two-b'], 'concatArrays properly runs');
			});

			test('permissions.camelizeArray', function () {
				deepEqual(permissions.camelizeArray(concated, false), camelized, 'camelizeArray properly runs');
			});

			asyncTest('permissions.newRules', function () {
				permissions.newRules(rules, function (r) {
					deepEqual(rules, expected, 'new rules created properly');
					QUnit.start();
				});
			});

			test('permissions.init', function () {
				QUnit.reset();
				permissions.rules = {};
				permissions.defaultRules = rules;
				var r = permissions.init();
				deepEqual(r, expected, 'permissions.rules properly created');
			});			
		}
	};
});