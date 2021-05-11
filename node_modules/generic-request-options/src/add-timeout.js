'use strict';

/**
 * @param {number} [user_timeout]
 *
 * @returns {number}
 */
module.exports = function addTimeout( user_timeout ) {
  var timeout = 10 * 1000;

  if ( typeof user_timeout === 'number' && !isNaN( user_timeout ) ) {
    timeout = user_timeout;
  }

  return timeout;
};
