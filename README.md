<!-- TITLE -->

<!-- BADGES/ -->

[![Build Status](https://img.shields.io/travis/bevry/extendr/master.svg)](http://travis-ci.org/bevry/extendr "Check this project's build status on TravisCI")
[![NPM version](https://img.shields.io/npm/v/extendr.svg)](https://npmjs.org/package/extendr "View this project on NPM")
[![NPM downloads](https://img.shields.io/npm/dm/extendr.svg)](https://npmjs.org/package/extendr "View this project on NPM")
[![Dependency Status](https://img.shields.io/david/bevry/extendr.svg)](https://david-dm.org/bevry/extendr)
[![Dev Dependency Status](https://img.shields.io/david/dev/bevry/extendr.svg)](https://david-dm.org/bevry/extendr#info=devDependencies)<br/>
[![Gratipay donate button](https://img.shields.io/gratipay/bevry.svg)](https://www.gratipay.com/bevry/ "Donate weekly to this project using Gratipay")
[![Flattr donate button](https://img.shields.io/badge/flattr-donate-yellow.svg)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](https://img.shields.io/badge/bitcoin-donate-yellow.svg)](https://bevry.me/bitcoin "Donate once-off to this project using BitCoin")
[![Wishlist browse button](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://bevry.me/wishlist "Buy an item on our wishlist for us")

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Utilities for cloning, extending, and de-referencing objects in shallow, deep, and safe ways

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

## Install

### [NPM](http://npmjs.org/)
- Use: `require('extendr')`
- Install: `npm install --save extendr`

### [Browserify](http://browserify.org/)
- Use: `require('extendr')`
- Install: `npm install --save extendr`
- CDN URL: `//wzrd.in/bundle/extendr@3.0.0`

### [Ender](http://enderjs.com)
- Use: `require('extendr')`
- Install: `ender add extendr`

<!-- /INSTALL -->


## Usage

### API

- `require('extendr').extend(target, ...objects)` - shallow extend the properties from the objects into the target
- `require('extendr').deep(target, ...objects)` - deep extend the properties from the objects into the target
- `require('extendr').defaults(target, ...objects)` - shallow extend the properties from the objects into the target where the target's value is undefined or null
- `require('extendr').deepDefaults(target, ...objects)` - deep extend the properties from the objects into the target where the target's value is undefined or null
- `require('extendr').clone(...objects)` - deep extend the properties from the objects into a new object
- `require('extendr').dereferenceJSON(object)` - clones the object by stringifg it, then parsing the result, to ensure all references are destroyed (objects that not plain objects or arrays will be lost)


### Implementation

- Extendr arguments can only be plain JavaScript objects, anything else will throw. This is intentional to guarantee consistency of references.
- Object property values that are plain objects or arrays will be dereferenced. All other object types will keep their reference.


<!-- HISTORY/ -->

## History
[Discover the change history by heading on over to the `HISTORY.md` file.](https://github.com/bevry/extendr/blob/master/HISTORY.md#files)

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/bevry/extendr/blob/master/CONTRIBUTING.md#files)

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

## Backers

### Maintainers

These amazing people are maintaining this project:

- Benjamin Lupton <b@lupton.cc> (https://github.com/balupton)

### Sponsors

No sponsors yet! Will you be the first?

[![Gratipay donate button](https://img.shields.io/gratipay/bevry.svg)](https://www.gratipay.com/bevry/ "Donate weekly to this project using Gratipay")
[![Flattr donate button](https://img.shields.io/badge/flattr-donate-yellow.svg)](http://flattr.com/thing/344188/balupton-on-Flattr "Donate monthly to this project using Flattr")
[![PayPayl donate button](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QB8GQPZAH84N6 "Donate once-off to this project using Paypal")
[![BitCoin donate button](https://img.shields.io/badge/bitcoin-donate-yellow.svg)](https://bevry.me/bitcoin "Donate once-off to this project using BitCoin")
[![Wishlist browse button](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://bevry.me/wishlist "Buy an item on our wishlist for us")

### Contributors

These amazing people have contributed code to this project:

- [Benjamin Lupton](https://github.com/balupton) <b@lupton.cc> — [view contributions](https://github.com/bevry/extendr/commits?author=balupton)
- [sfrdmn](https://github.com/sfrdmn) — [view contributions](https://github.com/bevry/extendr/commits?author=sfrdmn)

[Become a contributor!](https://github.com/bevry/extendr/blob/master/CONTRIBUTING.md#files)

<!-- /BACKERS -->


<!-- LICENSE/ -->

## License

Unless stated otherwise all works are:

- Copyright &copy; 2013+ Bevry Pty Ltd <us@bevry.me> (https://bevry.me)
- Copyright &copy; 2011-2012 Benjamin Lupton <b@lupton.cc> (https://balupton.com)

and licensed under:

- The incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://opensource.org/licenses/mit-license.php)

<!-- /LICENSE -->


