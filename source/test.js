/* eslint quote-props:0, new-cap:0, object-shorthand:0, new-cap:0, no-unused-vars:0, class-methods-use-this:0 */
'use strict'

// Import
const assertHelpers = require('assert-helpers')
const kava = require('kava')
const extendr = require('./')

// Helper
function delve(item, keys) {
	// Split keys if they are a string
	if (typeof keys === 'string') {
		keys = keys.split('.')
	}

	// Return if we have no keys
	if (keys.length === 0) {
		return
	}

	// Return if we have no object
	if (!item) {
		return
	}

	// Return if we are not a delveable type like object or function
	if (typeof item !== 'object' && typeof item !== 'function') {
		return
	}

	// Get the deepmost item
	const untilLast = keys.slice(0, -1)
	for (let i = 0; i < untilLast.length; ++i) {
		item = delve(item, untilLast[i])
		if (!item) {
			return
		}
	}

	// We've gotten the deepmost item, get the value now
	const last = keys.slice(-1)
	const result = item[last]

	// Return
	return result
}

// Test
kava.suite('extendr', function(suite, test) {
	// Prepare
	function getOriginalData() {
		return {
			object: {
				object: {
					array: [0],
					function: function() {
						return 0
					},
					number: 0,
					empty: null,
					base: 0,
					originalStranger: 0
				},
				array: [0],
				function: function() {
					return 0
				},
				number: 0,
				empty: null,
				base: 0,
				originalStranger: 0
			},
			array: [0],
			function: function() {
				return 0
			},
			number: 0,
			empty: null,
			base: 0,
			originalStranger: 0
		}
	}
	function getInputData() {
		return {
			object: {
				object: {
					array: [1],
					function: function() {
						return 1
					},
					number: 1,
					empty: 1,
					base: null,
					inputStranger: 1
				},
				array: [1],
				function: function() {
					return 1
				},
				number: 1,
				empty: 1,
				base: null,
				inputStranger: 1
			},
			array: [1],
			function: function() {
				return 1
			},
			number: 1,
			empty: 1,
			base: null,
			inputStranger: 1
		}
	}

	function check({ suite, test, original, input, output, values, references }) {
		test('values were as expected', function() {
			assertHelpers.deepEqual(output, values)
		})
		Object.keys(references).forEach(function(key) {
			const reference = references[key]
			const outputValue = delve(output, key)
			const inputValue = delve(input, key)
			const originalValue = delve(original, key)
			test(`${key} should reference ${reference}`, function() {
				if (reference === 'new') {
					assertHelpers.equal(
						outputValue === inputValue,
						false,
						'should not reference input value'
					)
					assertHelpers.equal(
						outputValue === originalValue,
						false,
						'should not reference original value'
					)
				} else if (reference === 'input') {
					assertHelpers.equal(
						outputValue === inputValue,
						true,
						'should reference input value'
					)
					assertHelpers.equal(
						outputValue === originalValue,
						false,
						'should not reference original value'
					)
				} else if (reference === 'original') {
					assertHelpers.equal(
						outputValue === inputValue,
						false,
						'should not reference input value'
					)
					assertHelpers.equal(
						outputValue === originalValue,
						true,
						'should reference original value'
					)
				}
			})
		})
	}

	suite('extend', function(suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const values = {
			// note that the objects are new, instead of the input values directly
			// this derefencing is important, as it ensures that data never gets mashed up
			// see the derefencing test for more information
			object: {
				// new
				object: {
					// new
					array: [1], // new
					function: input.object.object.function, // input
					number: 1,
					empty: 1,
					base: null,
					// notice how originalStranger is missing, this is important
					inputStranger: 1
				},
				array: [1], // new
				function: input.object.function, // input
				number: 1,
				empty: 1,
				base: null,
				// notice how originalStranger is missing, this is important
				inputStranger: 1
			},
			array: [1], // new
			function: input.function, // input
			number: 1,
			empty: 1,
			base: null,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			object: 'new',
			array: 'new',
			function: 'input',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'input',
			'object.object.array': 'new',
			'object.object.function': 'input'
		}
		const output = extendr.extend({}, original, input)
		check({ suite, test, original, input, output, values, references })
	})

	suite('extend with traverse', function(suite, test) {
		const origin = getOriginalData()
		const input = getInputData()
		const values = {
			object: {
				// new
				object: {
					// new
					array: [1], // new
					function: input.object.object.function, // input
					number: 1,
					empty: 1,
					base: null,
					originalStranger: 0, // notice my presence
					inputStranger: 1
				},
				array: [1], // new
				function: input.object.function, // input
				number: 1,
				empty: 1,
				base: null,
				originalStranger: 0, // notice my presence
				inputStranger: 1
			},
			array: [1], // new
			function: input.function, // input
			number: 1,
			empty: 1,
			base: null,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			object: 'new',
			array: 'new',
			function: 'input',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'input',
			'object.object.array': 'new',
			'object.object.function': 'input'
		}
		const output = extendr.deep({}, origin, input)
		check({ suite, test, origin, input, output, values, references })
	})

	test('extend dereference example', function() {
		const database = {}

		const plainUser = {}
		plainUser.name = 'Plain Object User'

		class User {}
		const classUser = new User()
		classUser.name = 'Class Instance User'

		const users = { plainUser, classUser }
		extendr.extend(database, { users })

		assertHelpers.equal(
			database.users === users,
			false,
			'database.users should not be users object, but a new object'
		)
		assertHelpers.equal(
			database.users.plainUser === plainUser,
			false,
			'database.users.plainUser should not be plainUser object, but a new object'
		)
		assertHelpers.equal(
			database.users.classUser === classUser,
			true,
			'database.users.classUser should be classUser object, as only arrays and plain objects are dereferenced'
		)

		users.plainUser.nickname = 'Plainy'
		assertHelpers.equal(
			database.users.plainUser.nickname || null,
			null,
			"plainUser's nickname should not exist in database, as it was applied to plainUser object not the new object"
		)

		users.classUser.nickname = 'Classy'
		assertHelpers.equal(
			database.users.classUser.nickname,
			'Classy',
			"classUser's nickname should exist in database, as classUser object was not dereferenced"
		)

		users.santa = {}
		users.santa.name = 'Santa Claus'
		assertHelpers.equal(
			database.users.santa || null,
			null,
			'santa should not exist in database, as it was applied to users object not the new database users object'
		)

		database.users.bunny = {}
		database.users.bunny.name = 'Easter Bunny'
		assertHelpers.equal(
			users.bunny || null,
			null,
			'bunny should not exist in users, as it was applied to the new database users object not the users object'
		)

		/*
		Why is this done this way?
		Well it is the only way to guarantee consistent results.
		For instance, if you have:
		extend({a:null}, {a:{b:2}})
		extend({a:{b:1}}, {a:{b:2}})
		If we didn't dereference, then how should these be handled?

		These are the options:

		1. Create a clean object, inject current then new properties into it (current choice)

		2. We inject new properties into the current object if it exists, if the current object doesn't exist
			1. Create a clean object, inject new properties into it
			2. Use the new object directly

		3. Use the new object directly, and inject missing current properties into it

		The one that provides the most consistency so that you always know what is going on, is the first and our current choice.
		If one wants to maintain a reference, then they can not use extendr for it.

		Option 2 provides little consistency and would be confusing.

		Option 3 seems a bit strange, but perhaps could be an option, however could still cause gotchas in this use case:

			const a1 = {z: 1}
			const a2 = {z: 2}
			const b1 = {z: 1}
			const c2 = {z: 2}
			const o1 = {a: a1, b: b1}
			const o2 = {a: a2, c: c2}
			extend(o1, o2)

			// a1 reference was abandoned, as it was replaced by the new a2
			a1.z = 3
			assertHelpers.equal(o1.a.z, 2)

			// a2 reference is kept, as it overwrote the old a1
			a2.z = 4
			assertHelpers.equal(o1.a.z, 4)

			// b1 reference is kept, as it was not touched
			b1.z = 5
			assertHelpers.equal(o1.b.z, 5)

			// c2 reference is kept, as it was not touched
			c2.z = 6
			assertHelpers.equal(o1.c.z, 6)

		Whereas with option 1, you would have the next test

		Perhaps in the future we will revise this, for now, it is the way it is.
		*/
	})

	test('extend dereference comment example', function() {
		const a1 = { z: 1 }
		const a2 = { z: 2 }
		const b1 = { z: 1 }
		const c2 = { z: 2 }
		const o1 = { a: a1, b: b1 }
		const o2 = { a: a2, c: c2 }
		extendr.custom({}, o1, o2)

		// a1 reference was abandoned, as it was replaced by a new clean object
		a1.z = 3
		assertHelpers.equal(
			o1.a.z,
			2,
			'o1.a.z should be the extended value, not the manual set value'
		)

		// a2 reference was abandoned, as it was replaced by a new clean object
		a2.z = 4
		assertHelpers.equal(
			o1.a.z,
			2,
			'o1.a.z should be the original value, not the manual set value'
		)

		// b1 reference is kept, as it was not touched
		b1.z = 5
		assertHelpers.equal(
			o1.b.z,
			5,
			'o1.b.z should be the manual value, not the old extended value'
		)

		// c2 reference was abandoned, as it was replaced by a new clean object
		c2.z = 6
		assertHelpers.equal(
			o1.c.z,
			2,
			'o1.c.z should be the extended value, not the manual set value'
		)
	})

	test('extend handles edge cases correctly', function() {
		let tmp = null
		const n = null
		const f = false
		const t = true
		const s = 'string'
		const a = [1, 2]
		function m() {}
		const c = class {
			constructor() {
				this.p = 2
			}
			f() {
				return 2
			}
			static s() {
				return 2
			}
		}
		const i = new c()
		const o = { n: 'nested' }

		const targetError =
			'extendr only supports extending plain objects, target was not a plain object'
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, n),
			'using null as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, f),
			'using false as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, t),
			'using true as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, s),
			'using string as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, a),
			'using array as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, m),
			'using function as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, c),
			'using class as target'
		)
		assertHelpers.expectThrowViaFunction(
			targetError,
			extendr.extend.bind(null, i),
			'using instance as target'
		)

		const inputError =
			'extendr only supports extending plain objects, an input was not a plain object'
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, n),
			'using null as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, f),
			'using false as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, t),
			'using true as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, s),
			'using string as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, a),
			'using array as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, m),
			'using function as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, c),
			'using class as input'
		)
		assertHelpers.expectThrowViaFunction(
			inputError,
			extendr.extend.bind(null, {}, i),
			'using instance as input'
		)

		assertHelpers.deepEqual(extendr.extend(o), o, 'single argument works')
		assertHelpers.equal(
			extendr.extend(o),
			o,
			'single argument reference is correct'
		)
		assertHelpers.deepEqual(extendr.extend({}, o), o, 'object extension works')
		assertHelpers.equal(
			extendr.extend((tmp = {}), o),
			tmp,
			'object extension reference is correct'
		)

		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: n }),
			{ p: n },
			'property was overwritten with null'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: f }),
			{ p: f },
			'property was overwritten with false'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: t }),
			{ p: t },
			'property was overwritten with true'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: s }),
			{ p: s },
			'property was overwritten with string'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: a }),
			{ p: a },
			'property was overwritten with array'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: m }),
			{ p: m },
			'property was overwritten with method'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: c }),
			{ p: c },
			'property was overwritten with class'
		)
		assertHelpers.deepEqual(
			extendr.extend({ p: {} }, { p: i }),
			{ p: i },
			'property was overwritten with instance'
		)

		assertHelpers.equal(
			extendr.extend({ p: {} }, { p: a }).p === a,
			false,
			'property was overwritten with array and reference was destroyed'
		)
		assertHelpers.equal(
			extendr.extend({ p: {} }, { p: m }).p,
			m,
			'property was overwritten with method and reference was maintained'
		)
		assertHelpers.equal(
			extendr.extend({ p: {} }, { p: c }).p,
			c,
			'property was overwritten with class and reference was maintained'
		)
		assertHelpers.equal(
			extendr.extend({ p: {} }, { p: i }).p,
			i,
			'property was overwritten with instance and reference was maintained'
		)
	})

	suite('extend with defaults', function(suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const values = {
			object: {
				// new
				object: {
					// new
					array: [0], // new
					function: original.object.object.function, // original
					number: 0,
					empty: null,
					base: 0,
					originalStranger: 0
				},
				array: [0], // new
				function: original.object.function, // original
				number: 0,
				empty: null,
				base: 0,
				originalStranger: 0
			},
			array: [0], // new
			function: original.function, // original
			number: 0,
			empty: 1,
			base: 0,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			object: 'new',
			array: 'new',
			function: 'origin',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'origin',
			'object.object.array': 'new',
			'object.object.function': 'origin'
		}
		const output = extendr.defaults({}, original, input)
		check({ suite, test, original, input, output, values, references })
	})

	suite('extend with traverse and defaults', function(suite, test) {
		const original = getOriginalData()
		const input = getInputData()
		const values = {
			object: {
				// new
				object: {
					// new
					array: [0], // new
					function: original.object.object.function, // original
					number: 0,
					empty: 1,
					base: 0,
					originalStranger: 0,
					inputStranger: 1
				},
				array: [0], // new
				function: original.object.function, // original
				number: 0,
				empty: 1,
				base: 0,
				originalStranger: 0,
				inputStranger: 1
			},
			array: [0], // new
			function: original.function, // original
			number: 0,
			empty: 1,
			base: 0,
			originalStranger: 0,
			inputStranger: 1
		}
		const references = {
			object: 'new',
			array: 'new',
			function: 'origin',
			'object.object': 'new',
			'object.array': 'new',
			'object.function': 'origin',
			'object.object.array': 'new',
			'object.object.function': 'origin'
		}
		const output = extendr.deepDefaults({}, original, input)
		check({ suite, test, original, input, output, values, references })
	})

	suite('deference', function(suite, test) {
		if (/a/.flags == null) {
			test('should not work with regexp on this version of node', function() {
				let threwError = false
				const hasA1 = /a/i
				try {
					const hasA2 = extendr.dereference(hasA1)
				} catch (err) {
					threwError = true
					assertHelpers.errorEqual(
						err,
						'extendr cannot derefence RegExps on this older version of node'
					)
				}
				if (threwError === false) {
					throw new Error('no error was thrown for this version of node')
				}
			})
		} else {
			test('works with regexp', function() {
				const hasA1 = /a/i
				const hasA2 = extendr.dereference(hasA1)
				assertHelpers.equal(hasA1 === hasA2, false, 'hasA1 should not be hasA2')
				assertHelpers.equal(
					hasA2.test('A'),
					true,
					'hasA2 should still function as hasA1'
				)
			})

			test('works with nested regexp', function() {
				const o1 = { hasA: /a/i }
				const o2 = extendr.dereference(o1)
				assertHelpers.equal(o1 === o2, false, 'o1 should not be o2')
				assertHelpers.equal(
					o1.hasA === o2.hasA,
					false,
					'o1.hasA should not be o2.hasA'
				)
				assertHelpers.equal(
					o2.hasA.test('A'),
					true,
					'o2.hasA should still function as o1.hasA'
				)
			})
		}
	})
})
