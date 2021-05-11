var test = require('tape');
var assertNoError = require('assert-no-error');
var BodyMover = require('../index');

var testCases = [
  {
    name: 'Error in request',
    opts: null,
    reqCallbackParams: [new Error('Network something oh no!')],
    expected: {
      error: {
        message: 'Network something oh no!'
      }
    }
  },
  {
    name: 'Failure status code',
    opts: null,
    reqCallbackParams: [
      null,
      {
        statusCode: 500
      }
    ],
    expected: {
      error: {
        message: 'Received status code 500.'
      }
    }
  },
  {
    name: 'url cited in error',
    opts: null,
    reqCallbackParams: [
      null,
      { statusCode: 401, url: 'https://smidgeo.com/api/snacc' }
    ],
    expected: {
      error: {
        message: 'Received status code 401 from https://smidgeo.com/api/snacc .'
      }
    }
  },
  {
    name: 'Custom response checking',
    opts: {
      responseIsOK(res) {
        return res.headers.cool == 'so cool';
      }
    },
    reqCallbackParams: [null, { headers: { bad: 'not cool' } }],
    expected: {
      error: {
        message: 'Bad response.'
      }
    }
  },
  {
    name: 'Custom response checking, positive case',
    opts: {
      responseIsOK(res) {
        return res.headers.cool == 'so cool';
      }
    },
    reqCallbackParams: [
      null,
      { headers: { cool: 'so cool' } },
      { message: 'wow' }
    ],
    expected: {
      body: { message: 'wow' }
    }
  },
  {
    name: 'Successful request',
    opts: null,
    reqCallbackParams: [null, { statusCode: 200 }, 'aw yea'],
    expected: {
      body: 'aw yea'
    }
  }
];

testCases.forEach(runCase);

function runCase(testCase) {
  test(testCase.name, runTest);

  function runTest(t) {
    var ctorParams = [];
    if (testCase.opts) {
      ctorParams.push(testCase.opts);
    }
    ctorParams.push(checkResult);

    BodyMover.apply(null, ctorParams).apply(null, testCase.reqCallbackParams);

    function checkResult(error, body) {
      if (testCase.expected.error) {
        t.equal(
          error.message,
          testCase.expected.error.message,
          'Correct error is passed to the callback.'
        );
      } else if (testCase.expected.body) {
        assertNoError(t.ok, error, 'No error passed to callback.');
        t.deepEqual(body, testCase.expected.body);
      }
      t.end();
    }
  }
}
