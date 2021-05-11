collect-in-channel
==================

A callback wrapper that will handle adding things passed to the callback to a 'channel'. A channel is an object that is being passed throughout a callback chain. Each callback may add things to that channel and look up things in that channel.

(This may turn out to be a bad idea; trying it out.)

Installation
------------

    npm install collect-in-channel

Usage
-----

    var Collect = require('collect-in-channel');
    var sb = require('standard-bail')();

    callApi(url1, Collect({ channel: {}, properties: [ 'username' ] }), sb(getNotes, handleError));
    
    function getNotes(channel) {
      callApi(url2 + channel.username, Collect({ channel, properties: [ 'notes' ] }), sb(getFirstNoteContent, handleError));
    }
 
    function getFirstNoteContent(channel) {
      callApi(url3 + channel.username + '/notes/' + channel.notes[0], Collect({ channel: properties: [ [ 'body', 'noteContent' ] ]}), sb(logContent, handleError));
    }

    function logContent(channel) {
      console.log(channel.noteContent);
    }
    
    function handleError(error) {
      console.log(error, error.stack);
    }

Params:

- opts:
    - channel: The channel object to add things to.
    - properties: A list of properties to look for on the incoming object. If a property is a two-element array, it'll look for the first element on the incoming object and store its value in the channel as the second element.
        - If the first element of the property is a function, it'll pass the body to it and let the function come up with the value to store in the channel.

It will return a callback handler that takes:
- An error (or null, if there's no error).
- A body object that is usually the result of the previous call.
- callback: This is the callback that it should call after it's done updating the channel.

If you want it to generate a callback handler that just takes a body and a callback, without an error param, pass `{ noErrorParam: true }` to the constructor.

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
