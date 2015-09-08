/* eslint quote-props:0 */

// Import
const assert = require('assert-helpers')
const joe = require('joe')
const extendr = require('../../')

// Helper
function delve (item, keys) {
	// Split keys if they are a string
	if ( typeof keys === 'string' ) {
		keys = keys.split('.')
	}

	// Return if we have no keys
	if ( keys.length === 0 ) {
		return
	}

	// Return if we have no object
	if ( !item ) {
		return
	}

	// Return if we are not a delveable type like object or function
	if ( typeof item !== 'object' && typeof item !== 'function' ) {
		return
	}

	// Get the deepmost item
	for ( const key of keys.slice(0, -1) ) {
		item = delve(item, key)
		if ( !item ) {
			return
		}
	}

	// We've gotten the deepmost item, get the value now
	const key = keys.slice(-1)[0]
	const result = item[key]

	// Return
	return result
}

// Test
joe.suite('extendr', function (suite, test) {
	// Prepare
	function getOriginalData () {
		return {
			object: {
				object: {
					array: [0],
					function: function () { return 0 },
					number: 0,
					empty: null,
					base: 0,
					originalStranger: 0
				},
				array: [0],
				function: function () { return 0 },
				number: 0,
				empty: null,
				base: 0,
				originalStranger: 0
			},
			array: [0],
			function: function () { return 0 },
			number: 0,
			empty: null,
			base: 0,
			originalStranger: 0
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
					base: null,
					inputStranger: 1
				},
				array: [1],
				function: function () { return 1 },
				number: 1,
				empty: 1,
				base: null,
				inputStranger: 1
			},
			array: [1],
			function: function () { return 1 },
			number: 1,
			empty: 1,
			base: null,
			inputStranger: 1
		}
	}

	function check ({suite, test, original, input, output, values, references}) {
		test('values were as expected', function () {
			assert.deepEqual(output, values)
		})
		Object.keys(references).forEach(function (key) {
			const reference = references[key]
			const outputValue = delve(output, key)
			const inputValue = delve(input, key)
			const originalValue = delve(original, key)
			test(`${key} should reference ${reference}`, function () {
				if ( reference === 'new' ) {
					assert.equal(outputValue === inputValue, false, 'should not reference input value')
					assert.equal(outputValue === originalValue, false, 'should not reference original value')
				}
				else if ( reference === 'input' ) {
					assert.equal(outputValue === inputValue, true, 'should reference input value')
					assert.equal(outputValue === originalValue, false, 'should not reference original value')
				}
				else if ( reference === 'original' ) {
					assert.equal(outputValue === inputValue, false, 'should not reference input value')
					assert.equal(outputValue === originalValue, true, 'should reference original value')
				}
			})
		})
	}

	suite('extend', function (suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const opts = {traverse: false, defaults: false}
		const values = {
			object: {  // new
				object: {  // new
					array: [1],  // new
					function: input.object.object.function,  // input
					number: 1,
					empty: 1,
					base: null,
					// notice how originalStranger is missing, this is important
					inputStranger: 1
				},
				array: [1],  // new
				function: input.object.function,  // input
				number: 1,
				empty: 1,
				base: null,
				// notice how originalStranger is missing, this is important
				inputStranger: 1
			},
			array: [1],  // new
			function: input.function,  // input
			number: 1,
			empty: 1,
			base: null,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			'object': 'new',
			'array': 'new',
			'function': 'input',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'input',
			'object.object.array': 'new',
			'object.object.function': 'input'
		}
		const output = extendr.custom(opts, {}, original, input)
		check({suite, test, original, input, output, values, references})
	})

	suite('extend with defaults', function (suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const opts = {traverse: false, defaults: true}
		const values = {
			object: {  // new
				object: {  // new
					array: [0],  // new
					function: original.object.object.function,  // original
					number: 0,
					empty: null,
					base: 0,
					originalStranger: 0
				},
				array: [0],  // new
				function: original.object.function,  // original
				number: 0,
				empty: null,
				base: 0,
				originalStranger: 0
			},
			array: [0],  // new
			function: original.function,  // original
			number: 0,
			empty: 1,
			base: 0,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			'object': 'new',
			'array': 'new',
			'function': 'origin',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'origin',
			'object.object.array': 'new',
			'object.object.function': 'origin'
		}
		const output = extendr.custom(opts, {}, original, input)
		check({suite, test, original, input, output, values, references})
	})

	suite('extend with traverse', function (suite, test) {
		const origin = getOriginalData()
		const input = getInputData()
		const opts = {traverse: true, defaults: false}
		const values = {
			object: {  // new
				object: {  // new
					array: [1],  // new
					function: input.object.object.function,  // input
					number: 1,
					empty: 1,
					base: null,
					originalStranger: 0,  // notice my presence
					inputStranger: 1
				},
				array: [1],  // new
				function: input.object.function,  // input
				number: 1,
				empty: 1,
				base: null,
				originalStranger: 0,  // notice my presence
				inputStranger: 1
			},
			array: [1],  // new
			function: input.function,  // input
			number: 1,
			empty: 1,
			base: null,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			'object': 'new',
			'array': 'new',
			'function': 'input',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'input',
			'object.object.array': 'new',
			'object.object.function': 'input'
		}
		const output = extendr.custom(opts, {}, origin, input)
		check({suite, test, origin, input, output, values, references})
	})

	suite('extend with traverse and defaults', function (suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const opts = {traverse: true, defaults: true}
		const values = {
			object: {  // new
				object: {  // new
					array: [0],  // new
					function: original.object.object.function,  // original
					number: 0,
					empty: 1,
					base: 0,
					originalStranger: 0,
					inputStranger: 1
				},
				array: [0],  // new
				function: original.object.function,  // original
				number: 0,
				empty: 1,
				base: 0,
				originalStranger: 0,
				inputStranger: 1
			},
			array: [0],  // new
			function: original.function,  // original
			number: 0,
			empty: 1,
			base: 0,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			'object': 'new',
			'array': 'new',
			'function': 'origin',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'origin',
			'object.object.array': 'new',
			'object.object.function': 'origin'
		}
		const output = extendr.custom(opts, {}, original, input)
		check({suite, test, original, input, output, values, references})
	})

})
