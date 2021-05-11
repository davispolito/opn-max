'use strict';

/**
 * adds common proxy/load balancer headers to options.headers if they exist in the request_headers
 * param
 *
 * @param {Object} [user_headers]
 * @param {Object} request_headers
 *
 * @returns {*|{}}
 */
module.exports = function addRequestHeaders( user_headers, request_headers ) {
  var headers = {};

  if ( user_headers instanceof Object ) {
    headers = user_headers;
  }

  if ( !( request_headers instanceof Object ) ) {
    return headers;
  }

  if ( typeof request_headers[ 'x-forwarded-for' ] === 'string' ) {
    headers[ 'x-forwarded-for' ] = request_headers[ 'x-forwarded-for' ];
  }

  if ( typeof request_headers[ 'x-forwarded-proto' ] === 'string' ) {
    headers[ 'x-forwarded-proto' ] = request_headers[ 'x-forwarded-proto' ];
  }

  if ( typeof request_headers[ 'x-real-ip' ] === 'string' ) {
    headers[ 'x-real-ip' ] = request_headers[ 'x-real-ip' ];
  }

  if ( typeof request_headers[ 'x-real-agent' ] === 'string' ) {
    headers[ 'x-real-agent' ] = request_headers[ 'x-real-agent' ];
  }

  return headers;
};
