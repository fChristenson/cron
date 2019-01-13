// file for testing services
const puppeteer = require("puppeteer");
const services = require("./src/lib/services");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  const result = await services.googleTrendService.getSpaTrend(page);

  await browser.close();
  console.log(result);
  console.log("--------------------------");
})();
