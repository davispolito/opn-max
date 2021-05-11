request-body-mover
==================

A callback for `request` that will: 1) Check status codes and call your callback with an error if necessary and 2) pass the body to your callback if everything is OK.

Also compatible with [basic-browser-request](https://github.com/jimkang/basic-browser-request);

Installation
------------

    npm install request-body-mover

Usage
-----

There's a lot of situations in which you call request, then have to do a little extra checking:

    var request = require('request');

    function yourFunctionThatGetsAnAPIThing(done) {
      var reqOpts = {
        method: 'GET',
        url: 'https://some.api/thing',
        json: true
      };
      request(reqOpts, handleResponse);

      function handleResponse(error, res, body) {
        if (error) {
          done(error);
        } else if (res.statusCode < 200 || res.statusCode > 299) {
          done(new Error(`Received status code ${res.statusCode} from https://some.api/thing .`));
        } else {
          done(null, body);
        }
      }
    }

`request-body-mover` lets you do this:

    var request = require('request');
    var bodyMover = require('request-body-mover');
    
    function yourFunctionThatGetsAnAPIThing(done) {
      var reqOpts = {
        method: 'GET',
        url: 'https://some.api/thing',
        json: true
      };
      request(reqOpts, bodyMover(done));
    }

The two code snippets behave the same.

You can also specify some opts as the first argument and the callback as the second argument if you want to provide some custom behavior. e.g. Your own response checker, if you don't want it to just look out for non-200 status codes. e.g.:

    bodyMover({ responseIsOK(res) { return res.statusCode === 201; }, done);

You can specify the url that appears in the response-related error messages as well (this is useful for `request`-likes that happen to not provide a `url` in the response):

    bodyMover({ url: 'https://some.api/thing', responseIsOK(res) { return res.statusCode === 201; }, done);

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2018 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
