// Import
const typeChecker = require('typechecker')

// Internal use only: Extend with customisations
export function custom ({defaults = false, traverse = false}, target, ...objs) {
	if ( !typeChecker.isPlainObject(target) ) {
		throw new Error('extendr only supports extending plain objects, target was not a plain object')
	}
	for ( const obj of objs ) {
		if ( !typeChecker.isPlainObject(obj) ) {
			throw new Error('extendr only supports extending plain objects, an input was not a plain object')
		}
		for ( const key in obj ) {
			if ( obj.hasOwnProperty(key) ) {
				// if not defaults only, always overwrite
				// if defaults only, overwrite if current value is empty
				const defaultSkip = defaults && target[key] != null

				// get the new value
				let newValue = obj[key]

				// ensure everything is new
				if ( typeChecker.isPlainObject(newValue) ) {
					if ( traverse && typeChecker.isPlainObject(target[key]) ) {
						// replace current value with
						// dereferenced merged new object
						target[key] = custom({traverse, defaults}, {}, target[key], newValue)
					}
					else if ( !defaultSkip ) {
						// replace current value with
						// dereferenced new object
						target[key] = custom({defaults}, {}, newValue)
					}
				}
				else if ( !defaultSkip ) {
					if ( typeChecker.isArray(newValue) ) {
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
export function extend (...args) {
	return custom({}, ...args)
}

// Extend +traverse
export function deep (...args) {
	return custom({traverse: true}, ...args)
}

// Extend +defaults
export function defaults (...args) {
	return custom({defaults: true}, ...args)
}

// Extend +traverse +defaults
export function deepDefaults (...args) {
	return custom({traverse: true, defaults: true}, ...args)
}

// Extend to new object +traverse
export function clone (...args) {
	return custom({traverse: true}, {}, ...args)
}

// Will not keep functions
export function dereferenceJSON (source) {
	return JSON.parse(JSON.stringify(source))
}
