'use strict';

module.exports = {
  headers: {
    'date': new Date().toUTCString(),
    'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'.replace( '%node', process.version ),
    'x-forwarded-proto': 'https'
  },
  timeout: 10000
};
