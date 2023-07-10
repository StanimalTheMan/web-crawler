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

async function crawlPage(baseURL, currentURL, pages) {
  // check to avoid crawling internet, just domain in question
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  // get normalized version of the currentURL
  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  // haven't made request to current URL, so add to pages tracker
  pages[normalizedCurrentURL] = 1;

  let htmlBody = "";
  try {
    const resp = await fetch(currentURL);
    if (resp.status >= 400 && resp.status < 600) {
      console.log("There was a client/server error.  Try again.");
      return pages;
    }
    if (!resp.headers.get("content-type").includes("text/html")) {
      console.log(resp.headers.get("content-type"));
      console.log("Invalid content type header format");
      return pages;
    }
    htmlBody = await resp.text();
  } catch (err) {
    console.log(err.message);
  }
  const nextURLS = getURLsFromHTML(htmlBody, baseURL);
  for (const urlFromHTML of nextURLS) {
    pages = await crawlPage(baseURL, urlFromHTML, pages);
  }
  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
