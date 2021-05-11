'use strict';

module.exports = {
  headers: {
    'date': new Date().toUTCString(),
    'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'.replace( '%node', process.version ),
    'x-real-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
  },
  timeout: 10000
};
