const puppeteer = require("puppeteer");
const config = require("../../../config/config");
const logger = require("../../logging/logger");

class IndeedService {
  constructor(jobStatisticsService) {
    this.jobStatisticsService = jobStatisticsService;
  }

  async getJobPostings(region, title) {
    logger.info("getJobPostings", region, title);
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1280
      },
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();
    try {
      await page.goto(this._getUrl(region, title));
      logger.info(`Visitied: ${this._getUrl(region, title)}`);
      const results = await this._getResults(page, region);
      await browser.close();
      const keywordStats = this.jobStatisticsService.createStatsObject(
        results.keywords
      );
      //this.jobStatisticsService.storeToolReferences(region, title, keywordStats);
      return {
        keywordStats
      };
    } catch (error) {
      logger.error(error.message);
      return [];
    }
  }

  async _getResults(page, region) {
    const selector =
      ".jobsearch-SerpJobCard, .row, .result, .clickcard, .vjs-highlight";
    const posts = await page.$$(selector);
    let keywords = [];

    for (const post of posts) {
      await post.click();
      await page.waitFor(1000);
      const descriptionText = await this._getDescriptionText(page);
      const pageKeywords = this.jobStatisticsService.getKeywords(
        descriptionText
      );
      keywords = keywords.concat(pageKeywords);
    }

    return {
      keywords
    };
  }

  async _getDescriptionText(page) {
    const selector = "#vjs-desc";
    await page.waitFor(selector, { timeout: 60000 });
    const descElement = await page.$(selector);
    const textContent = await descElement.getProperty("textContent");
    return await textContent.jsonValue();
  }

  _getUrl(region, title) {
    return `${config.indeed.regions[region].host}/jobs?q=${title}&l=&radius=25&sort=date&limit=50`;
  }
}

module.exports = IndeedService;
