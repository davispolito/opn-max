function CollectToChannel({ channel, properties, noErrorParam }) {
  if (noErrorParam) {
    return collectToChannelWithoutErrorParam;
  } else {
    return collectToChannel;
  }

  function collectToChannel(error, body, done) {
    if (error) {
      done(error);
    } else {
      collectToChannelWithoutErrorParam(body, done);
    }
  }

  function collectToChannelWithoutErrorParam(body, done) {
    if (body) {
      properties.forEach(addToChannel);
    }
    done(null, channel);

    function addToChannel(property) {
      if (Array.isArray(property) && property.length === 2) {
        let firstElement = property[0];
        if (typeof firstElement === 'function') {
          channel[property[1]] = firstElement(body);
        } else {
          channel[property[1]] = body[property[0]];
        }
      } else {
        channel[property] = body[property];
      }
    }
  }
}

module.exports = CollectToChannel;
