// Import
const assert = require('assert-helpers')
const joe = require('joe')
const extendr = require('../../')

// Test
joe.suite('extendr', function (suite, test) {
	// Prepare
	const testOriginData = {
		object: {
			object: {
				array: [0],
				number: 0,
				empty: null,
				originStranger: 0
			},
			array: [0],
			number: 0,
			empty: null,
			originStranger: 0
		},
		array: [0],
		number: 0,
		empty: null,
		originStranger: 0
	}
	const testFirstInputData = {
		object: {
			object: {
				array: [1],
				number: 1,
				empty: 1,
				firstStranger: 1
			},
			array: [1],
			number: 1,
			empty: 1,
			firstStranger: 1
		},
		array: [1],
		number: 1,
		empty: 1,
		firstStranger: 1
	}
	const tests = {
		extend: {
			opts: {traverse: false, defaults: null},
			alias: 'extend',
			output: {
				object: {
					object: {
						array: [1],
						number: 1,
						empty: 1,
						firstStranger: 1
					},
					array: [1],
					number: 1,
					empty: 1,
					firstStranger: 1
				},
				array: [1],
				number: 1,
				empty: 1,
				originStranger: 0,
				firstStranger: 1
			}
		},
		'extend with defaults': {
			opts: {defaults: true},
			output: {
				object: {
					object: {
						array: [0],
						number: 0,
						empty: null,
						originStranger: 0
					},
					array: [0],
					number: 0,
					empty: null,
					originStranger: 0
				},
				array: [0],
				number: 0,
				empty: 1,
				originStranger: 0,
				firstStranger: 1
			}
		},
		'extend with traverse': {
			opts: {traverse: true},
			output: {
				object: {
					object: {
						array: [1],
						number: 1,
						empty: 1,
						originStranger: 0,
						firstStranger: 1
					},
					array: [1],
					number: 1,
					empty: 1,
					originStranger: 0,
					firstStranger: 1
				},
				array: [1],
				number: 1,
				empty: 1,
				originStranger: 0,
				firstStranger: 1
			}
		},
		'extend with traverse and defaults': {
			opts: {traverse: true, defaults: true},
			output: {
				object: {
					object: {
						array: [0],
						number: 0,
						empty: 1,
						originStranger: 0,
						firstStranger: 1
					},
					array: [0],
					number: 0,
					empty: 1,
					originStranger: 0,
					firstStranger: 1
				},
				array: [0],
				number: 0,
				empty: 1,
				originStranger: 0,
				firstStranger: 1
			}
		}
	}

	// @TODO add function property, and check reference for that
	// ^ will possibly mean, as we can't dereference functions, perhaps we shouldn't dereference anything
	Object.keys(tests).forEach(function (name) {
		suite(name, function (suite, test) {
			const origin = JSON.parse(JSON.stringify(testOriginData))
			const first = JSON.parse(JSON.stringify(testFirstInputData))
			const value = tests[name]
			const output = extendr.custom(value.opts, origin, first)

			test('results', function () {
				assert.deepEqual(output, value.output, 'output content was as expected')
				assert.deepEqual(output === origin, true, 'output object is the origin object')
			})

			test('result should not reference anything from the first input', function () {
				assert.equal(output.object !== first.object, true, 'object reference')
				assert.equal(output.array !== first.array, true,  'array reference')
				assert.equal(output.object.object !== first.object.object, true, 'object.object reference')
				assert.equal(output.object.array !== first.object.array, true, 'object.array reference')
				assert.equal(output.object.object.array !== first.object.object.array, true, 'object.object.array reference')
			})
		})
	})

})
