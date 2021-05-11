'use strict';

module.exports = {
  headers: {
    'date': new Date().toUTCString(),
    'user-agent': 'node.js/%node request (https://www.npmjs.com/package/request)'.replace( '%node', process.version ),
    'x-forwarded-for': '127.0.0.1',
    'x-forwarded-proto': 'https',
    'x-real-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'x-real-ip': '127.0.0.1'
  },
  timeout: 10000
};
