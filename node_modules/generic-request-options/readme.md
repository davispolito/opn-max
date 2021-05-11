# generic request options
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

provides a generic set of request options for the [request][request-url] package that can be augmented by providing [`user_options`](#user_options) and [`request_headers`](#request_headers).

## table of contents
* [installation](#installation)
* [use](#use)
    * [getGenericRequestOptions( [user_options][, request_headers] )](#getgenericrequestoptions-user_options-request_headers-)
    * [user_options](#user_options)
    * [request_headers](#request_headers)
    * [basic](#basic)
    * [adding user options](#adding-user-options)
    * [overriding the default timeout](#overriding-the-default-timeout)
    * [adding additional headers](#adding-additional-headers)
    * [with req.headers](#with-reqheaders)
* [license](#license)

## installation
```javascript
npm install generic-request-options
```

## use
### getGenericRequestOptions( [user_options][, request_headers] )
```javascript
@param {Object} [user_options]
@param {Object} [request_headers]
@returns {Object}
```

### user_options
any valid [request options][request-options-url]

### request_headers
the intention is to pass in optional [http request headers][http-request-headers-url] that will be used by the [request][request-url] method.

in order to pass on proxy headers, you can also pass in the `req.headers` that make up the header object of an [express][express-url] route request. the intent being to pass on the proxy headers:

* x-forwarded-for
* x-forwarded-proto
* x-real-agent
* x-real-ip

### basic
the basic use case will return the http headers date and user-agent, and a timeout
```javascript
var getGenericRequestOptions = require( 'generic-request-options' );
var request = require( 'request' );

function responseHandler( err, res, body ) {
  // handle request response
}

request( getGenericRequestOptions(), responseHandler );

// getGenericRequestOptions => {
  headers: {
    date: '<new Date().toUTCString()>'
    'user-agent': 'node.js/<node-version> request (https://www.npmjs.com/package/request)'
  },
  timeout: 10000
}
```

### adding user options
```javascript
var getGenericRequestOptions = require( 'generic-request-options' );
var request = require( 'request' );

var user_options = { 
  method: 'get', 
  url: 'https://your.api' 
};

function responseHandler( err, res, body ) {
  // handle request response
}

request( getGenericRequestOptions( user_options ), responseHandler );

// getGenericRequestOptions => {
  headers: {
    date: '<new Date().toUTCString()>'
    'user-agent': 'node.js/<node-version> request (https://www.npmjs.com/package/request)'
  },
  method: 'get',
  timeout: 10000,
  url: 'https://your.api'
}
```

### overriding the default timeout
```javascript
var getGenericRequestOptions = require( 'generic-request-options' );
var request = require( 'request' );

var user_options = { 
  method: 'get', 
  timeout: 3000, 
  url: 'https://your.api' 
};

function responseHandler( err, res, body ) {
  // handle request response
}

request( getGenericRequestOptions( user_options ), responseHandler );

// getGenericRequestOptions => {
  headers: {
    date: '<new Date().toUTCString()>'
    'user-agent': 'node.js/<node-version> request (https://www.npmjs.com/package/request)'
  },
  method: 'get',
  timeout: 3000,
  url: 'https://your.api'
}
```

### adding additional headers
```javascript
var getGenericRequestOptions = require( 'generic-request-options' );
var request = require( 'request' );

var request_headers = { 
  headers: { 
    accept: 'application/json' 
  } 
};

var user_options = { 
  method: 'get', 
  url: 'https://your.api' 
};

function responseHandler( err, res, body ) {
  // handle request response
}

request( getGenericRequestOptions( user_options, request_headers ), responseHandler );

// getGenericRequestOptions => {
  headers: {
    accept: 'application/json',
    date: '<new Date().toUTCString()>',
    'user-agent': 'node.js/<node-version> request (https://www.npmjs.com/package/request)'
  },
  method: 'get',
  timeout: 10000,
  url: 'https://your.api'
}
```

### with req.headers
where `req.headers` is, for example, the header object from an [express][express-url] route request
```javascript
var getGenericRequestOptions = require( 'generic-request-options' );
var request = require( 'request' );

function responseHandler( err, res, body ) {
  // handle request response
}

function middleware( req, res, next ) {
  var user_options = { 
    method: 'get', 
    url: 'https://your.api' 
  };

  request( getGenericRequestOptions( user_options, req.headers ), responseHandler );
  next();
);

// getGenericRequestOptions => {
  headers: {
    date: '<new Date().toUTCString()>'
    'user-agent': 'node.js/<node-version> request (https://www.npmjs.com/package/request)'
    'x-forwarded-for': <request_headers['x-forward-for']>,
    'x-forwarded-proto': <request_headers['x-forward-for']>,
    'x-real-agent': <request_headers['x-real-agent']>,
    'x-real-ip': <request_headers['x-real-ip']>
  },
  method: 'get',
  timeout: 10000,
  url: 'https://your.api'
}
```

## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/dan-nl/generic-request-options/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/generic-request-options?branch=master
[express-url]: https://www.npmjs.com/package/express
[http-request-headers-url]: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields
[mit-license]: https://raw.githubusercontent.com/dan-nl/generic-request-options/master/license.txt
[npm-image]: https://img.shields.io/npm/v/generic-request-options.svg
[npm-url]: https://www.npmjs.com/package/generic-request-options
[request-options-url]: https://www.npmjs.com/package/request#requestoptions-callback
[request-url]: https://www.npmjs.com/package/request
[travis-image]: https://travis-ci.org/dan-nl/generic-request-options.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/generic-request-options
