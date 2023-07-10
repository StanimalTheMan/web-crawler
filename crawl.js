const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(urlString) {
  const urlStringObj = new URL(urlString);
  // there seems to be no obvious difference for this function between host and hostname property on URL object?
  const normalizedURLString = urlStringObj.hostname + urlStringObj.pathname;
  const normalizedURLStringLen = normalizedURLString.length;
  if (normalizedURLString[normalizedURLStringLen - 1] == "/") {
    return normalizedURLString.substring(0, normalizedURLStringLen - 1);
  }
  return normalizedURLString;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");
  const urlsFromHTML = [];
  for (const aTag of aTags) {
    if (aTag.href.slice(0, 8) === "https://") {
      urlsFromHTML.push(aTag.href);
    } else if (aTag.href[0] === "/") {
      urlsFromHTML.push(baseURL + aTag.href);
    }
  }
  return urlsFromHTML;
}

function crawlPage(baseURL) {
  fetch(baseURL)
    .then((resp) => {
      if (resp.status >= 400 && resp.status < 600) {
        console.log("There was a client/server error.  Try again.");
        return;
      }
      if (resp.headers.get("content-type") !== "text/html; charset=UTF-8") {
        console.log(resp.headers.get("content-type"));
        console.log("Invalid content type header format");
        return;
      }
      resp.text().then((htmlBody) => console.log(htmlBody));
    })
    .catch((err) => console.log(err));
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
