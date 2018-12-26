const puppeteer = require("puppeteer");
const logger = require("../../logging/logger");

class ComitStripService {
  async getComicImageUrl() {
    logger.info("getComicImageUrl");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    const dateString = new Date().toISOString().split("T")[0];
    const dateUrl = dateString.replace(/-/g, "/");
    try {
      await page.goto(`http://www.commitstrip.com/en/${dateUrl}`);
      logger.info(`Visitied: http://www.commitstrip.com/en/${dateUrl}`);
      await this._clickFirstSectionAnchor(page);
      const text = await this._getFirstImageUrl(page);
      await browser.close();
      return text;
    } catch (error) {
      logger.error(error.stack);
      return "";
    }
  }

  _clickFirstSectionAnchor(page) {
    const selector = "section a";
    return Promise.all([page.waitForNavigation(), page.click(selector)]);
  }

  async _getFirstImageUrl(page) {
    const selector = "img";
    const element = await page.$(selector);
    const src = await element.getProperty("src");
    return await src.jsonValue();
  }
}

module.exports = ComitStripService;
