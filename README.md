<!-- TITLE/ -->

<h1>extendr</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.org/bevry/extendr" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/bevry/extendr/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/extendr" title="View this project on NPM"><img src="https://img.shields.io/npm/v/extendr.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/extendr" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/extendr.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/bevry/extendr" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/bevry/extendr.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/bevry/extendr#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/bevry/extendr.svg" alt="Dev Dependency Status" /></a></span>
<br class="badge-separator" />
<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-thanksapp"><a href="https://givethanks.app/donate/npm/extendr" title="Donate to this project using Thanks App"><img src="https://img.shields.io/badge/thanksapp-donate-yellow.svg" alt="Thanks App donate button" /></a></span>
<span class="badge-boostlab"><a href="https://boost-lab.app/bevry/extendr" title="Donate to this project using Boost Lab"><img src="https://img.shields.io/badge/boostlab-donate-yellow.svg" alt="Boost Lab donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Utilities for cloning, extending, and de-referencing objects in shallow, deep, and safe ways

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save extendr</code></li>
<li>Module: <code>require('extendr')</code></li></ul>

<a href="http://browserify.org" title="Browserify lets you require('modules') in the browser by bundling up all of your dependencies"><h3>Browserify</h3></a><ul>
<li>Install: <code>npm install --save extendr</code></li>
<li>Module: <code>require('extendr')</code></li>
<li>CDN URL: <code>//wzrd.in/bundle/extendr@3.3.1</code></li></ul>

<a href="http://enderjs.com" title="Ender is a full featured package manager for your browser"><h3>Ender</h3></a><ul>
<li>Install: <code>ender add extendr</code></li>
<li>Module: <code>require('extendr')</code></li></ul>

<h3><a href="https://github.com/bevry/editions" title="Editions are the best way to produce and consume packages you care about.">Editions</a></h3>

<p>This package is published with the following editions:</p>

<ul><li><code>extendr</code> aliases <code>extendr/index.js</code> which uses <a href="https://github.com/bevry/editions" title="Editions are the best way to produce and consume packages you care about.">Editions</a> to automatically select the correct edition for the consumers environment</li>
<li><code>extendr/source/index.js</code> is esnext source code with require for modules</li>
<li><code>extendr/edition-browsers/index.js</code> is esnext compiled for browsers with require for modules</li>
<li><code>extendr/edition-node-0.12/index.js</code> is esnext compiled for node.js 0.12 with require for modules</li></ul>

<!-- /INSTALL -->


## Usage

### API

- `require('extendr').extend(target, ...objects)` - shallow extend the properties from the objects into the target
- `require('extendr').deep(target, ...objects)` - deep extend the properties from the objects into the target
- `require('extendr').defaults(target, ...objects)` - shallow extend the properties from the objects into the target where the target's value is undefined or null
- `require('extendr').deepDefaults(target, ...objects)` - deep extend the properties from the objects into the target where the target's value is undefined or null
- `require('extendr').clone(...objects)` - deep extend the properties from the objects into a new object
- `require('extendr').dereference(object)` - clones the object by traversing through it and setting up new instances of anything that can be referenced
- `require('extendr').dereferenceJSON(object)` - clones the object by stringifying it, then parsing the result, to ensure all references are destroyed (objects that not plain objects or arrays will be lost)


### Implementation

- Extendr arguments can only be plain JavaScript objects, anything else will throw. This is intentional to guarantee consistency of references.
- Object property values that are plain objects or arrays will be dereferenced. All other object types will keep their reference.


<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/bevry/extendr/blob/master/HISTORY.md#files">Discover the release history by heading on over to the <code>HISTORY.md</code> file.</a>

<!-- /HISTORY -->


<!-- CONTRIBUTE/ -->

<h2>Contribute</h2>

<a href="https://github.com/bevry/extendr/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /CONTRIBUTE -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/bevry/extendr/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository bevry/extendr">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<span class="badge-patreon"><a href="https://patreon.com/bevry" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-flattr"><a href="https://flattr.com/profile/balupton" title="Donate to this project using Flattr"><img src="https://img.shields.io/badge/flattr-donate-yellow.svg" alt="Flattr donate button" /></a></span>
<span class="badge-liberapay"><a href="https://liberapay.com/bevry" title="Donate to this project using Liberapay"><img src="https://img.shields.io/badge/liberapay-donate-yellow.svg" alt="Liberapay donate button" /></a></span>
<span class="badge-thanksapp"><a href="https://givethanks.app/donate/npm/extendr" title="Donate to this project using Thanks App"><img src="https://img.shields.io/badge/thanksapp-donate-yellow.svg" alt="Thanks App donate button" /></a></span>
<span class="badge-boostlab"><a href="https://boost-lab.app/bevry/extendr" title="Donate to this project using Boost Lab"><img src="https://img.shields.io/badge/boostlab-donate-yellow.svg" alt="Boost Lab donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/balupton" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>
<span class="badge-opencollective"><a href="https://opencollective.com/bevry" title="Donate to this project using Open Collective"><img src="https://img.shields.io/badge/open%20collective-donate-yellow.svg" alt="Open Collective donate button" /></a></span>
<span class="badge-crypto"><a href="https://bevry.me/crypto" title="Donate to this project using Cryptocurrency"><img src="https://img.shields.io/badge/crypto-donate-yellow.svg" alt="crypto donate button" /></a></span>
<span class="badge-paypal"><a href="https://bevry.me/paypal" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-wishlist"><a href="https://bevry.me/wishlist" title="Buy an item on our wishlist for us"><img src="https://img.shields.io/badge/wishlist-donate-yellow.svg" alt="Wishlist browse button" /></a></span>

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://balupton.com">Benjamin Lupton</a> — <a href="https://github.com/bevry/extendr/commits?author=balupton" title="View the GitHub contributions of Benjamin Lupton on repository bevry/extendr">view contributions</a></li>
<li><a href="http://seanfridman.com">Sean Fridman</a> — <a href="https://github.com/bevry/extendr/commits?author=sfrdmn" title="View the GitHub contributions of Sean Fridman on repository bevry/extendr">view contributions</a></li></ul>

<a href="https://github.com/bevry/extendr/blob/master/CONTRIBUTING.md#files">Discover how you can contribute by heading on over to the <code>CONTRIBUTING.md</code> file.</a>

<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2013+ <a href="http://bevry.me">Bevry Pty Ltd</a></li>
<li>Copyright &copy; 2011-2012 <a href="http://balupton.com">Benjamin Lupton</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
