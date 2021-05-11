'use strict';

/**
 * @param {Object} [user_headers]
 *
 * @returns {string}
 */
module.exports = function addUserAgent( user_headers ) {
  var user_agent =
    'node.js/%node request (https://www.npmjs.com/package/request)'
      .replace( '%node', process.version );

  if ( typeof user_headers[ 'user-agent' ] === 'string' ) {
    user_agent = user_headers[ 'user-agent' ];
  }

  return user_agent;
};
