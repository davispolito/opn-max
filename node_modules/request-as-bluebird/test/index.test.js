/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getRequestAsBluebird = require( '../src' );
var Promise = require( 'bluebird' );

describe( 'getRequestAsBluebird( user_options )', function () {
  it( 'should return a bluebird promise', function () {
    return expect( getRequestAsBluebird( 'https://www.google.com' ) ).to.be.instanceof( Promise );
  } );

  it( 'should resolve with an array containing the [ response, body ]', function () {
    return getRequestAsBluebird( 'https://google.com' )
      .then(
        function ( result ) {
          expect( result.response ).to.be.an( 'object' );
          expect( result.body ).to.be.a( 'string' );
        }
      );
  } );

  it( 'should reject when an error occurs', function () {
    return getRequestAsBluebird( null )
      .catch(
        function ( err ) {
          expect( err ).to.be.instanceof( Error );
        }
      );
  } );

  it( 'should not have loaded the request-debug module', function () {
    return getRequestAsBluebird( null )
      .catch(
        function () {
          expect( require.cache[ require.resolve( 'request-debug' ) ] ).to.not.exist;
        }
      );
  } );

  it( 'should have loaded the request-debug module', function () {
    return getRequestAsBluebird( null, true )
      .catch(
        function () {
          expect( require.cache[ require.resolve( 'request-debug' ) ] ).to.exist;
        }
      );
  } );
} );
