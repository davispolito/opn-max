function RequestBodyMover(param1, param2) {
  var done;
  if (typeof param1 === 'object') {
    var { url, responseIsOK } = param1;
    done = param2;
  } else {
    done = param1;
  }

  if (!responseIsOK) {
    responseIsOK = defaultResponseIsOK;
  }
  return receiver;

  function receiver(error, res, body) {
    if (error) {
      done(error);
    } else if (!responseIsOK(res)) {
      let message = '';
      if (responseIsOK === defaultResponseIsOK) {
        message = `Received status code ${res.statusCode}`;
      } else {
        message = 'Bad response';
      }
      if (url) {
        message += ` from ${url} `;
      } else if (res.url) {
        message += ` from ${res.url} `;
      }
      message += '.';
      done(new Error(message));
    } else {
      done(null, body);
    }
  }
}

function defaultResponseIsOK(res) {
  return res.statusCode > 199 && res.statusCode < 300;
}

module.exports = RequestBodyMover;
