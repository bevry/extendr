'use strict'

// Import
const typeChecker = require('typechecker')

// Internal use only: Extend with customisations
function custom ({ defaults = false, traverse = false }, target, ...objs) {
	if (!typeChecker.isPlainObject(target)) {
		throw new Error('extendr only supports extending plain objects, target was not a plain object')
	}
	for (let objIndex = 0; objIndex < objs.length; ++objIndex) {
		const obj = objs[objIndex]
		if (!typeChecker.isPlainObject(obj)) {
			throw new Error('extendr only supports extending plain objects, an input was not a plain object')
		}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				// if not defaults only, always overwrite
				// if defaults only, overwrite if current value is empty
				const defaultSkip = defaults && target[key] != null

				// get the new value
				const newValue = obj[key]

				// ensure everything is new
				if (typeChecker.isPlainObject(newValue)) {
					if (traverse && typeChecker.isPlainObject(target[key])) {
						// replace current value with
						// dereferenced merged new object
						target[key] = custom({ traverse, defaults }, {}, target[key], newValue)
					}
					else if (!defaultSkip) {
						// replace current value with
						// dereferenced new object
						target[key] = custom({ defaults }, {}, newValue)
					}
				}
				else if (!defaultSkip) {
					if (typeChecker.isArray(newValue)) {
						// replace current value with
						// dereferenced new array
						target[key] = newValue.slice()
					}
					else {
						// replace current value with
						// possibly referenced: function, class, etc
						// possibly unreferenced: string
						// new value
						target[key] = newValue
					}
				}
			}
		}
	}
	return target
}

// Extend without customisations
function extend (...args) {
	return custom({}, ...args)
}

// Extend +traverse
function deep (...args) {
	return custom({ traverse: true }, ...args)
}

// Extend +defaults
function defaults (...args) {
	return custom({ defaults: true }, ...args)
}

// Extend +traverse +defaults
function deepDefaults (...args) {
	return custom({ traverse: true, defaults: true }, ...args)
}

// Extend to new object +traverse
function clone (...args) {
	return custom({ traverse: true }, {}, ...args)
}

// Will not keep functions or regexp
function dereferenceJSON (source) {
	return JSON.parse(JSON.stringify(source))
}

// Dereference most things, including RegExp, but not functions or classes
function dereference (source) {
	if (typeChecker.isString(source)) {
		return source.toString()
	}

	if (typeChecker.isUndefined(source)) {
		return
	}

	if (typeChecker.isNull(source)) {
		return null
	}

	if (typeChecker.isNumber(source) || typeChecker.isBoolean(source)) {
		return dereferenceJSON(source)
	}

	if (typeChecker.isPlainObject(source)) {
		const result = {}
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				const value = source[key]
				result[key] = dereference(value)
			}
		}
		return result
	}

	if (typeChecker.isArray(source)) {
		return source.map(function (item) {
			return dereference(item)
		})
	}

	if (typeChecker.isDate(source)) {
		return new Date(source.toISOString())
	}

	if (typeChecker.isRegExp(source)) {
		return new RegExp(source.source, source.flags)
	}

	throw new Error('extendr was passed an object type that it does not know how to derefence')
}

// Export
module.exports = {
	custom,
	extend,
	deep,
	defaults,
	deepDefaults,
	clone,
	dereference,
	dereferenceJSON
}
