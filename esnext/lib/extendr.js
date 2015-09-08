// Import
const typeChecker = require('typechecker')

// Extend with customisations
export function custom ({defaults = false, traverse = false}, target, ...objs) {
	for ( const obj of objs ) {
		if ( !typeChecker.isPlainObject(obj) )  continue
		for ( const key in obj ) {
			if ( obj.hasOwnProperty(key) ) {
				debugger
				// if not defaults only, always overwrite
				// if defaults only, overwrite if current value is empty
				if ( defaults && target[key] != null )  continue

				// get the new value
				let newValue = obj[key]

				// ensure everything is new
				if ( typeChecker.isPlainObject(newValue) ) {
					if ( traverse ) {
						newValue = custom({traverse, defaults}, {}, target[key], newValue)
					}
					else {
						newValue = custom({defaults}, {}, newValue)
					}
				}
				else if ( typeChecker.isArray(newValue) ) {
					newValue = newValue.slice()
				}

				// apply the new value
				target[key] = newValue
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
