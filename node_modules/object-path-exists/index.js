function pathExists(object, path) {
  var current = object;
  return path.every(segmentExists, true);
  
  function segmentExists(segment) {
    current = current[segment];
    return current;
  }
}

module.exports = pathExists;
