'use strict';

var addRequestHeaders = require( './add-request-headers' );
var addTimeout = require( './add-timeout' );
var addUserAgent = require( './add-user-agent' );

/**
 * provides a generic set of request options for the npm request module that can be augmented
 *
 * @param {Object} [user_options]
 * @param {Object} [request_headers]
 * @returns {*|{}}
 */
module.exports = function getGenericRequestOptions( user_options, request_headers ) {
  var options = user_options || {};

  options.headers = addRequestHeaders( options.headers, request_headers );
  options.headers[ 'user-agent' ] = addUserAgent( options.headers );

  if ( !options.headers.date ) {
    options.headers.date = new Date().toUTCString();
  }

  options.timeout = addTimeout( options.timeout );

  return options;
};
