function printReport(pages) {
  console.log("Report is starting");
  console.log(pages);
  const countPairs = sortPages(pages);
  console.log(countPairs);
  for (const [url, count] of countPairs) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function sortPages(pages) {
  // Sort the pages so that pages with the largest number of inbound internal links are first
  // 1. Create items array
  const countPairs = Object.keys(pages).map(function (key) {
    return [key, pages[key]];
  });

  // 2. Sort the array based on value in descending order
  countPairs.sort(function (firstPair, secondPair) {
    return secondPair[1] - firstPair[1];
  });

  return countPairs;
}

module.exports = {
  printReport,
  sortPages,
};
