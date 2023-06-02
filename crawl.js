function normalizeURL(urlString) {
  const urlStringObj = new URL(urlString)
  // there seems to be no obvious difference for this function between host and hostname property on URL object?
  const normalizedURLString = urlStringObj.hostname + urlStringObj.pathname
  const normalizedURLStringLen = normalizedURLString.length
  if (normalizedURLString[normalizedURLStringLen - 1] == '/') {
    return normalizedURLString.substring(0, normalizedURLStringLen - 1)
  }
  return normalizedURLString
}

module.exports = {
  normalizeURL
}