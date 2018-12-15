const puppeteer = require("puppeteer");

class DilbertService {
  async getComicImageUrl() {
    console.log("getComicImageUrl");
    console.log("--------------------------");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    try {
      await page.goto("https://dilbert.com/");
      console.log("Visitied: https://dilbert.com/");
      console.log("--------------------------");
      const selector = ".img-responsive, .img-comic";
      const element = await page.$(selector);
      const src = await element.getProperty("src");
      const text = await src.jsonValue();
      await browser.close();
      return text;
    } catch (error) {
      console.log(error.message);
      console.log("--------------------------");
      return "";
    }
  }
}

module.exports = DilbertService;
