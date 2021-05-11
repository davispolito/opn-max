# request-as-bluebird
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

promise wrapper for the npm request package

wraps the npm [request][request-url] package, in a [bluebird][bluebird-url] promise, resolving with an object containing the response and body or rejecting with an `Error`; also allows you to turn on debugging using the npm [request-debug][request-debug-url] package.

## table of contents
* [installation](#installation)
* [usage](#usage)
    * [getRequestAsBluebird( user_options, debug )](#getrequestasbluebird-user_options-debug-)
    * [default](#default)
    * [with request-debug](#with-request-debug)
* [license](#license)

## installation
```javascript
npm install request-as-bluebird
```

## usage
### getRequestAsBluebird( user_options, debug )
```javascript
@param {string|Object} user_options
@param {boolean} [debug]
@returns {Promise}
```

the [request][request-url] package documentation details available user options. you may also want to consider using the [generic-request-options][generic-request-options-url] package to create the initial user options object.

### default
```javascript
var getRequestAsBluebird = require( 'request-as-bluebird' );

getRequestAsBluebird( 'https://www.google.com' )
  .then(
    /**
     * @param {Object} result
     * @param {IncomingMessage} result.response
     * @param {string} result.body
     */
    function( result ) {
      // handle resolve
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle reject
    }
  );
```

### with request-debug
```javascript
var getRequestAsBluebird = require( 'request-as-bluebird' );

getRequestAsBluebird( 'https://www.google.com', true )
  .then(
    /**
     * @param {Object} result
     * @param {IncomingMessage} result.response
     * @param {string} result.body
     */
    function( result ) {
      // handle resolve
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle reject
    }
  );
```

## license
[MIT License][mit-license]

[bluebird-url]: https://www.npmjs.com/package/bluebird
[coveralls-image]: https://coveralls.io/repos/github/dan-nl/request-as-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/request-as-bluebird?branch=master
[generic-request-options-url]: https://www.npmjs.com/package/generic-request-options
[mit-license]: https://raw.githubusercontent.com/dan-nl/request-as-bluebird/master/license.txt
[npm-image]: https://img.shields.io/npm/v/request-as-bluebird.svg
[npm-url]: https://www.npmjs.com/package/request-as-bluebird
[request-url]: https://www.npmjs.com/package/request
[request-debug-url]: https://www.npmjs.com/package/request-debug
[travis-image]: https://travis-ci.org/dan-nl/request-as-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/request-as-bluebird
