# Import
typeChecker = require('typechecker')

# Define
extendr =
	# Clone
	clone: (args...) ->
		args.unshift({})
		return @shallowExtendPlainObjects(args...)

	# Deep Clone
	deepClone: (args...) ->
		args.unshift({})
		return @deepExtendPlainObjects(args...)

	# Extend
	extend: (args...) ->
		return @shallowExtendPlainObjects(args...)

	# Deep Extend
	deepExtend: (args...) ->
		return @deepExtendPlainObjects(args...)

	# Shallow extend plain objects
	shallowExtendPlainObjects: (target,objs...) ->
		for obj in objs
			obj or= {}
			for own key,value of obj
				target[key] = value
		return target

	# Safe Shallow extend plain objects
	safeShallowExtendPlainObjects: (target,objs...) ->
		for obj in objs
			obj or= {}
			for own key,value of obj
				continue  unless value?
				target[key] = value
		return target

	# Deep extend plain objects
	deepExtendPlainObjects: (target,objs...) ->
		for obj in objs
			obj or= {}
			for own key,value of obj
				if typeChecker.isPlainObject(value)
					target[key] = {}  unless typeChecker.isPlainObject(target[key])
					@deepExtendPlainObjects(target[key], value)
				else if typeChecker.isArray(value)
					target[key] = value.slice()
				else
					target[key] = value
		return target

	# Safe Deep extend plain objects
	safeDeepExtendPlainObjects: (target,objs...) ->
		for obj in objs
			obj or= {}
			for own key,value of obj
				continue  unless value?
				if typeChecker.isPlainObject(value)
					target[key] = {}  unless typeChecker.isPlainObject(target[key])
					@safeDeepExtendPlainObjects(target[key], value)
				else if typeChecker.isArray(value)
					target[key] = value.slice()
				else
					target[key] = value
		return target

	# Return a dereferenced copy of the object
	# Will not keep functions
	dereference: (source) ->
		target = JSON.parse(JSON.stringify(source))
		return target

# Export
module.exports = extendr