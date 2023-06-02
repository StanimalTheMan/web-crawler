function normalizeURL(urlString) {
  // console.log(urlString)
  // console.log(new URL(urlString))
  const urlStringObj = new URL(urlString)
  const normalizedURLString = urlStringObj.hostname + urlStringObj.pathname
  const normalizedURLStringLen = normalizedURLString.length
  if (normalizedURLString[normalizedURLStringLen - 1] == '/') {
    return normalizedURLString.substring(0, normalizedURLStringLen - 1)
  }
  return normalizedURLString
}

// console.log(normalizeURL('https://wagslane.dev/path/'))
// normalizeURL('https://wagsLane.Dev/path')
// normalizeURL('https://wagslane.dev/path')
// normalizeURL('http://wagslane.dev/path')

module.exports = {
  normalizeURL
}