var test = require('tape');
var assertNoError = require('assert-no-error');
var CollectInChannel = require('../index');

var testCases = [
  {
    name: 'Collect two properties',
    channel: { id: 'existing' },
    properties: ['statusCode', 'sum'],
    incomingBody: { statusCode: 200, sum: 1000000, extraJunk: 'extra' },
    expectedChannel: { id: 'existing', statusCode: 200, sum: 1000000 }
  },
  {
    name: 'Properties missing from body',
    channel: { id: 'existing' },
    properties: ['statusCode', 'sum'],
    incomingBody: { errorMessage: 'uh oh', sum: -1, extraJunk: 'extra' },
    expectedChannel: { id: 'existing', statusCode: undefined, sum: -1 }
  },
  {
    name: 'Error',
    channel: { id: 'existing' },
    properties: ['statusCode', 'sum'],
    callbackError: new Error('oh no'),
    incomingBody: { errorMessage: 'uh oh', sum: -1, extraJunk: 'extra' },
    expectedChannel: undefined,
    expectedErrorMessage: 'oh no'
  },
  {
    name: 'Map property to a different name',
    channel: { id: 'existing' },
    properties: [['statusCode', 'code'], 'sum'],
    incomingBody: { statusCode: 200, sum: 1000000, extraJunk: 'extra' },
    expectedChannel: { id: 'existing', code: 200, sum: 1000000 }
  },
  {
    name: 'Generate callback handler that does take an error param',
    channel: { id: 'existing' },
    properties: [['statusCode', 'code'], 'sum'],
    noErrorParam: true,
    incomingBody: { statusCode: 200, sum: 1000000, extraJunk: 'extra' },
    expectedChannel: { id: 'existing', code: 200, sum: 1000000 }
  },
  {
    name: 'Use custom collector',
    channel: { id: 'existing' },
    properties: [
      ['statusCode', 'code'],
      'sum',
      [body => body.tree.b, 'greeting']
    ],
    noErrorParam: true,
    incomingBody: {
      statusCode: 200,
      sum: 1000000,
      extraJunk: 'extra',
      tree: { a: 'hey', b: 'yo' }
    },
    expectedChannel: { id: 'existing', code: 200, sum: 1000000, greeting: 'yo' }
  }
];

testCases.forEach(runCase);

function runCase(testCase) {
  test(testCase.name, runTest);

  function runTest(t) {
    var collect = CollectInChannel({
      channel: testCase.channel,
      properties: testCase.properties,
      noErrorParam: testCase.noErrorParam
    });
    if (testCase.noErrorParam) {
      collect(testCase.incomingBody, checkResult);
    } else {
      collect(testCase.callbackError, testCase.incomingBody, checkResult);
    }

    function checkResult(error, channel) {
      if (testCase.expectedErrorMessage) {
        t.equal(
          error.message,
          testCase.expectedErrorMessage,
          'Correct error is passed to the callback.'
        );
      } else {
        assertNoError(t.ok, error, 'No error passed to callback.');
        t.deepEqual(channel, testCase.expectedChannel);
      }
      t.end();
    }
  }
}
