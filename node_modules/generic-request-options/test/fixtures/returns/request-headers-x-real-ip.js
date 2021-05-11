'use strict';

module.exports = {
  headers: {
    'date': new Date().toUTCString(),
    'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'.replace( '%node', process.version ),
    'x-real-ip': '127.0.0.1'
  },
  timeout: 10000
};
