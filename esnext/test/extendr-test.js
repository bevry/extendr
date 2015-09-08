// Import
const assert = require('assert-helpers')
const typeChecker = require('typechecker')
const joe = require('joe')
const extendr = require('../../')

// Test
joe.suite('extendr', function (suite, test) {
	// Prepare
	function getOriginData () {
		return {
			object: {
				object: {
					array: [0],
					function: function () { return 0 },
					number: 0,
					empty: null,
					originStranger: 0
				},
				array: [0],
				function: function () { return 0 },
				number: 0,
				empty: null,
				originStranger: 0
			},
			array: [0],
			function: function () { return 0 },
			number: 0,
			empty: null,
			originStranger: 0
		}
	}
	function getInputData () {
		return {
			object: {
				object: {
					array: [1],
					function: function () { return 1 },
					number: 1,
					empty: 1,
					firstStranger: 1
				},
				array: [1],
				function: function () { return 1 },
				number: 1,
				empty: 1,
				firstStranger: 1
			},
			array: [1],
			function: function () { return 1 },
			number: 1,
			empty: 1,
			firstStranger: 1
		}
	}

	function check ({prefix = 'result', output, expected, suite, test}) {
		test(`${prefix}:keys`, function () {
			assert.deepEqual(Object.keys(output), Object.keys(expected), `${prefix} keys are as expected`)
		})
		suite(`${prefix}:values`, function (suite, test) {
			Object.keys(output).forEach(function (key) {
				test(`${prefix}.${key}:value`, function () {
					assert.equal(output[key], expected[key], `${prefix}.${key} is set and referenced correctly`)

					if ( typeChecker.isPlainObject(output[key]) ) {
						check({
							prefix: `${prefix}.${key}`,
							output: output[key],
							expected: expected[key],
							suite: suite,
							test: test
						})
					}
				})
			})
		})
	}

	suite('extend', function (suite, test) {
		const origin = getOriginData()
		const input = getInputData()
		const opts = {traverse: false, defaults: false}
		const expected = {
			object: input.object,
			array: input.array,
			function: input.function,
			number: 1,
			empty: 1,
			originStranger: 0,
			firstStranger: 1
		}
		const output = extendr.custom(opts, origin, input)
		check({output, expected, suite, test})
	})

	suite('extend with defaults', function (suite, test) {
		const origin = getOriginData()
		const input = getInputData()
		const opts = {traverse: false, defaults: true}
		const expected = {
			object: origin.object,
			array: origin.array,
			function: origin.function,
			number: 0,
			empty: 1,
			originStranger: 0,
			firstStranger: 1
		}
		const output = extendr.custom(opts, origin, input)
		check({output, expected, suite, test})
	})

	suite('extend with traverse', function (suite, test) {
		const origin = getOriginData()
		const input = getInputData()
		const opts = {traverse: true, defaults: false}
		const expected = {
			object: {
				object: {
					array: input.object.object.array,
					function: input.object.object.function,
					number: 1,
					empty: 1,
					originStranger: 0,
					firstStranger: 1
				},
				array: input.object.array,
				function: input.object.function,
				number: 1,
				empty: 1,
				originStranger: 0,
				firstStranger: 1
			},
			array: input.array,
			function: input.function,
			number: 1,
			empty: 1,
			originStranger: 0,
			firstStranger: 1
		}
		const output = extendr.custom(opts, origin, input)
		check({output, expected, suite, test})
	})

	suite('extend with traverse and defaults', function (suite, test) {
		const origin = getOriginData()
		const input = getInputData()
		const opts = {traverse: true, defaults: true}
		const expected = {
			object: {
				object: {
					array: origin.object.object.array,
					function: origin.object.object.function,
					number: 0,
					empty: 0,
					originStranger: 0,
					firstStranger: 1
				},
				array: origin.object.array,
				function: origin.object.function,
				number: 0,
				empty: 0,
				originStranger: 0,
				firstStranger: 1
			},
			array: origin.array,
			function: origin.function,
			number: 0,
			empty: 0,
			originStranger: 0,
			firstStranger: 1
		}
		const output = extendr.custom(opts, origin, input)
		check({output, expected, suite, test})
	})

})
