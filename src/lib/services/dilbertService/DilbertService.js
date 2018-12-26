const puppeteer = require("puppeteer");
const logger = require("../../logging/logger");

class DilbertService {
  async getComicImageUrl() {
    logger.info("getComicImageUrl");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    try {
      await page.goto("https://dilbert.com/");
      logger.info("Visitied: https://dilbert.com/");
      const selector = ".img-responsive, .img-comic";
      const element = await page.$(selector);
      const src = await element.getProperty("src");
      const text = await src.jsonValue();
      await browser.close();
      return text;
    } catch (error) {
      logger.error(error.message);
      return "";
    }
  }
}

module.exports = DilbertService;
