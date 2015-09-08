// Import
const assert = require('assert-helpers')
const joe = require('joe')
const extendr = require('../../')

// Test
joe.suite('extendr', function (suite, test) {
	// Prepare
	const testFirstData = {
		object: {
			number: 1,
			empty: null
		},
		array: [1],
		number: 1,
		empty: null
	}
	const testSecondData = {
		object: {
			empty: 2,
			stranger: 2
		},
		array: [2],
		number: 2,
		empty: 2,
		stranger: 2
	}
	const testOriginData = {}
	const tests = {
		extend: {
			opts: {traverse: false, defaults: null},
			alias: 'extend',
			output: {
				object: {
					empty: 2,
					stranger: 2
				},
				array: [2],
				number: 2,
				empty: 2,
				stranger: 2
			}
		},
		'extend with defaults': {
			opts: {defaults: true},
			output: {
				object: {
					number: 1,
					empty: null
				},
				array: [1],
				number: 1,
				empty: 2,
				stranger: 2
			}
		},
		'extend with traverse': {
			opts: {traverse: true},
			output: {
				object: {
					number: 1,
					empty: 2,
					stranger: 2
				},
				array: [2],
				number: 2,
				empty: 2,
				stranger: 2
			}
		},
		'extend with traverse and defaults': {
			opts: {traverse: true, defaults: true},
			output: {
				object: {
					number: 1,
					empty: 2,
					stranger: 2,
				},
				array: [1],
				number: 1,
				empty: 2,
				stranger: 2
			}
		}
	}

	Object.keys(tests).forEach(function (name) {
		suite(name, function (suite, test) {
			const origin = JSON.parse(JSON.stringify(testOriginData))
			const first = JSON.parse(JSON.stringify(testFirstData))
			const second = JSON.parse(JSON.stringify(testSecondData))
			const value = tests[name]
			const output = extendr.custom(value.opts, origin, first, second)

			test('results', function () {
				assert.deepEqual(output, value.output, 'output content was as expected')
				assert.deepEqual(output === origin, true, 'output object is the origin object')
			})

			if ( value.opts.defaults ) {
				// @TODO add a check for extend({a:{b:{c:1}}}, {a:{b:{c:2}}}) to check references of a and b
				test('result data should be of origin descent, as it was not overwritten', function () {
					assert.equal(output.object === origin.object, true, 'check object reference')
					assert.equal(output.array === origin.array, true, 'check array reference')
				})
			}
			else {
				test('result data should be of new descent (not first), as it was overwritten and dereferenced', function () {
					assert.equal(output.object !== first.object, true, 'check object reference')
					assert.equal(output.array  !== first.array, true, 'check array reference')
				})
				test('result data should be of new descent (not second), as it was overwritten and dereferenced', function () {
					assert.equal(output.object !== second.object, true, 'check object reference')
					assert.equal(output.array  !== second.array, true, 'check array reference')
				})
			}
		})
	})

})
