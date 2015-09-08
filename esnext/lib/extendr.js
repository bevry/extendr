// Import
const typeChecker = require('typechecker')

// Extend with customisations
export function custom ({defaults = false, traverse = false}, target, ...objs) {
	for ( const obj of objs ) {
		if ( !typeChecker.isPlainObject(obj) )  continue
		for ( const key in obj ) {
			if ( obj.hasOwnProperty(key) ) {
				// if not defaults only, always overwrite
				// if defaults only, overwrite if current value is empty
				const defaultSkip = defaults && target[key] != null

				// get the new value
				let newValue = obj[key]

				// ensure everything is new
				if ( typeChecker.isPlainObject(newValue) ) {
					if ( traverse ) {
						target[key] = custom({traverse, defaults}, {}, target[key], newValue)
					}
					else if ( !defaultSkip ) {
						target[key] = custom({defaults}, {}, newValue)
					}
				}
				else if ( !defaultSkip ) {
					if ( typeChecker.isArray(newValue) ) {
						target[key] = newValue.slice()
					}
					else {
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

// Extend deeply
export function deep (...args) {
	return custom({traverse: true}, {}, ...args)
}

// Extend safely
export function safe (...args) {
	return custom({defaults: true}, {}, ...args)
}

// Will not keep functions
export function dereference (source) {
	return JSON.parse(JSON.stringify(source))
}
