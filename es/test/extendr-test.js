# Import
assert = require('assert')
joe = require('joe')
{expect,assert} = require('chai')
extendr = require('../../')

# Test
joe.describe 'extendr', (describe,it) ->

	# =================================
	# Safe

	it 'should shallow extend correctly',->
		# Prepare
		src1 =
			a:
				b: 1
			c: [1]
			d: 1
		src2 =
			d: null
		out1Expected =
			a:
				b: 2
			c: [1,2]
			d: null
		src1Expected =
			a:
				b: 2
			c: [1,2]
			d: 1

		# Get result
		out1 = extendr.shallowExtendPlainObjects({}, src1, src2)

		# Update result to check referencing issues
		out1.a.b = 2
		out1.c.push(2)

		# Check ot see if the result was over-written correctly as this is a shallow extend
		expect(out1, 'out1 object was as expected')
			.to.deep.equal(out1Expected)
		expect(src1, 'src1 object was modified as expected')
			.to.deep.equal(src1Expected)

	it 'should safe shallow extend correctly', ->
		# Prepare
		src1 =
			a:
				b: 1
			c: [1]
			d: 1
		src2 =
			d: null
		out1Expected =
			a:
				b: 2
			c: [1,2]
			d: 1
		src1Expected =
			a:
				b: 2
			c: [1,2]
			d: 1

		# Get result
		out1 = extendr.safeShallowExtendPlainObjects({}, src1, src2)

		# Update result to check referencing issues
		out1.a.b = 2
		out1.c.push(2)

		# Check ot see if the result was over-written correctly as this is a shallow extend
		expect(out1, 'out1 object was as expected')
			.to.deep.equal(out1Expected)
		expect(src1, 'src1 object was modified as expected')
			.to.deep.equal(src1Expected)


	# =================================
	# Deep


	it 'should deep extend correctly', ->
		# Prepare
		src1 =
			a:
				b: 1
			c: [1]
			d: 1
		src2 =
			d: null
		out1Expected =
			a:
				b: 2
			c: [1,2]
			d: null
		src1Expected =
			a:
				b: 1
			c: [1]
			d: 1

		# Get result
		out1 = extendr.deepExtendPlainObjects({}, src1, src2)

		# Update result to check referencing issues
		out1.a.b = 2
		out1.c.push(2)

		# Check to see if the result was not over-written correctly as this is a deep extend
		expect(out1, 'out1 object was as expected')
			.to.deep.equal(out1Expected)
		expect(src1, 'src1 object was not modified as expected')
			.to.deep.equal(src1Expected)


	it 'should safe deep extend correctly', ->
		# Prepare
		src1 =
			a:
				b: 1
			c: [1]
			d: 1
		src2 =
			d: null
		out1Expected =
			a:
				b: 2
			c: [1,2]
			d: 1
		src1Expected =
			a:
				b: 1
			c: [1]
			d: 1

		# Get result
		out1 = extendr.safeDeepExtendPlainObjects({}, src1, src2)

		# Update result to check referencing issues
		out1.a.b = 2
		out1.c.push(2)

		# Check to see if the result was not over-written correctly as this is a deep extend
		expect(out1, 'out1 object was as expected')
			.to.deep.equal(out1Expected)
		expect(src1, 'src1 object was not modified as expected')
			.to.deep.equal(src1Expected)




	# =================================
	# Dereference

	it 'should dereference correctly', ->
		# Prepare
		src1 =
			a:
				b: 1
			c: [1]
			d: 1
		out1Expected =
			a:
				b: 2
			c: [1,2]
			d: 1
		src1Expected =
			a:
				b: 1
			c: [1]
			d: 1

		# Get result
		out1 = extendr.dereference(src1)

		# Update result to check referencing issues
		out1.a.b = 2
		out1.c.push(2)

		# Check to see if the result was not over-written correctly as this is a deep extend
		expect(out1, 'out1 object was as expected')
			.to.deep.equal(out1Expected)
		expect(src1, 'src1 object was not modified as expected')
			.to.deep.equal(src1Expected)
