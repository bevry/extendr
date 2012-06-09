# Requires
joe = require('joe')
joe.setDefaultReporter ->
	Reporter = joe.require('reporters/list')
	new Reporter()

# Tests
require(__dirname+'/compare.test')
require(__dirname+'/events.test')
require(__dirname+'/flow.test')
require(__dirname+'/paths.test')
require(__dirname+'/types.test')