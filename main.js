// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const { crawlPage } = require("./crawl");

function main() {
  const cliArguments = process.argv.slice(2);
  const numCliArguments = cliArguments.length;
  if (numCliArguments !== 1) {
    console.log(
      "Invalid # of inputs entered: Only enter a base URL such as 'http://www.mlb.com'"
    );
    process.exit();
  }
  const baseURL = cliArguments[0];
  console.log(`The web crawler is starting to crawl ${baseURL}.`);
  crawlPage(baseURL);
}

main();
