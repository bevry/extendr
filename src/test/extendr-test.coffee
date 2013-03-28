# Import
assert = require('assert')
joe = require('joe')
extendr = require('../lib/extendr')

# Test
joe.describe 'extendr', (describe,it) ->

	it 'should shallow extend correctly', (done) ->
		# Prepare
		src = {a:{b:2}}
		out = extendr.shallowExtendPlainObjects({},src)
		out.a.b = 3
		assert.deepEqual({a:{b:3}}, out, 'out object was as expected')
		assert.deepEqual({a:{b:3}}, src, 'src object was modified')
		done()

	it 'should safe shallow extend correctly', (done) ->
		# Prepare
		expected = {a:2}
		actual = extendr.safeShallowExtendPlainObjects({a:1}, {a:2}, {a:null})
		assert.deepEqual(actual, expected, 'out object was as expected')
		done()

	it 'should deep extend correctly', (done) ->
		# Prepare
		src = {a:{b:2}}
		out = extendr.deepExtendPlainObjects({},src)
		out.a.b = 3
		assert.deepEqual({a:{b:3}}, out, 'out object was as expected')
		assert.deepEqual({a:{b:2}}, src, 'src object was not modified')
		done()

	it 'should safe deep extend correctly', (done) ->
		# Prepare
		expected = {a:b:2}
		actual = extendr.safeDeepExtendPlainObjects({a:b:2}, {a:b:2}, {a:b:null})
		assert.deepEqual(actual, expected, 'out object was as expected')
		done()

	it 'should dereference correctly', (done) ->
		# Prepare
		src = {a:{b:2}}
		out = extendr.dereference(src)
		out.a.b = 3
		assert.deepEqual({a:{b:3}}, out, 'out object was as expected')
		assert.deepEqual({a:{b:2}}, src, 'src object was not modified')
		done()
