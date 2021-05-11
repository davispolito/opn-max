/* globals describe, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var getGenericRequestOptions = require( '../src' );

describe( 'getGenericRequestOptions( [options][, request_headers] )', function () {
  describe( 'should return an object that', function () {
    it( 'matches the default generic request options', function () {
      expect( getGenericRequestOptions() )
        .to.deep.equal( require( './fixtures/returns/generic-options' ) );
    } );

    it( 'overrides the default timeout when an options.timeout value is provided', function () {
      expect( getGenericRequestOptions( require( './fixtures/options-timeout' ) ) )
        .to.deep.equal( require( './fixtures/returns/with-options-timeout' ) );
    } );

    it( 'overrides the default user-agent when an options[ user-agent ] value is provided', function () {
      expect( getGenericRequestOptions( require( './fixtures/options-headers-user-agent' ) ) )
        .to.deep.equal( require( './fixtures/returns/with-options-headers-user-agent' ) );
    } );

    it( 'augments the options returned, e.g., options.headers.accept', function () {
      expect( getGenericRequestOptions( require( './fixtures/options-headers-accept' ) ) )
        .to.deep.equal( require( './fixtures/returns/with-options-headers-accept' ) );
    } );

    it( 'augments the options returned, e.g., options.headers.date', function () {
      expect( getGenericRequestOptions( require( './fixtures/options-headers-date' ) ) )
        .to.deep.equal( require( './fixtures/returns/with-options-headers-date' ) );
    } );

    it( 'maintain user provided options in the returned object', function () {
      expect( getGenericRequestOptions( require( './fixtures/options-extra' ) ) )
        .to.deep.equal( require( './fixtures/returns/with-options-extra' ) );
    } );

    describe( 'contains common request headers when provided: ', function () {
      it( 'x-forwarded-for', function () {
        expect( getGenericRequestOptions( {}, require( './fixtures/request-headers-x-forwarded-for' ) ) )
          .to.deep.equal( require( './fixtures/returns/request-headers-x-forwarded-for' ) );
      } );

      it( 'x-forwarded-proto', function () {
        expect( getGenericRequestOptions( {}, require( './fixtures/request-headers-x-forwarded-proto' ) ) )
          .to.deep.equal( require( './fixtures/returns/request-headers-x-forwarded-proto' ) );
      } );

      it( 'x-real-agent', function () {
        expect( getGenericRequestOptions( {}, require( './fixtures/request-headers-x-real-agent' ) ) )
          .to.deep.equal( require( './fixtures/returns/request-headers-x-real-agent' ) );
      } );

      it( 'x-real-ip', function () {
        expect( getGenericRequestOptions( {}, require( './fixtures/request-headers-x-real-ip' ) ) )
          .to.deep.equal( require( './fixtures/returns/request-headers-x-real-ip' ) );
      } );

      it( 'all of them', function () {
        expect( getGenericRequestOptions( {}, require( './fixtures/request-headers-all-common' ) ) )
          .to.deep.equal( require( './fixtures/returns/request-headers-all-common' ) );
      } );
    } );
  } );
} );
