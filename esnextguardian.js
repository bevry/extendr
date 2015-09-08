// September 8, 2015
// https://github.com/bevry/base
if ( process.env.REQUIRE_ESNEXT ) {
	module.exports = require('./esnext/lib/extendr.js')
}
else if ( !process.versions.v8 || process.versions.v8.split('.')[0] < 4 ) {
	module.exports = require('./es5/lib/extendr.js')
}
else {
	try {
		module.exports = require('./esnext/lib/extendr.js')
	}
	catch (e) {
		// console.log('Downgrading from ESNEXT to ES5 due to:', e.stack)
		module.exports = require('./es5/lib/extendr.js')
	}
}
