var test = require('tape');
var pathExists = require('../index');

var addresses = {
  countries: {
    'USA': {
      states: {
        IL: {},
        MA: {
          cities: {
            Somerville: {
              streets: []
            }
          }
        }
      }
    },
    'Canada': {
      'provinces': {
        'Alberta': {}
      }
    }
  }
};

var testCases = [
  {
    path: ['countries', 'USA', 'states', 'MA', 'cities', 'Somerville'],
    object: addresses,
    expected: true
  },
  {
    path: ['countries', 'Canada', 'states', 'MA', 'cities', 'Somerville'],
    object: addresses,
    expected: false
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    t.equal(pathExists(testCase.object, testCase.path), testCase.expected);
    t.end();
  });
}
