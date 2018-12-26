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
      const results = await this._getResults(page);
      await browser.close();
      const keywordStats = this.jobStatisticsService.createStatsObject(
        results.keywords
      );
      this.jobStatisticsService.storeToolReferences(
        region,
        title,
        keywordStats
      );
      return {
        keywordStats
      };
    } catch (error) {
      logger.error(error.message);
      return [];
    }
  }

  async _getResults(page) {
    const jobLinks = await this._getJobLinks(page);
    let keywords = [];

    for (const link of jobLinks) {
      try {
        await page.goto(link);
        logger.info(`Visited: ${link}`);
        const descriptionText = await this._getDescriptionText(page);
        const pageKeywords = this.jobStatisticsService.getKeywords(
          descriptionText
        );
        logger.info(`Found keywords: ${pageKeywords}`);
        keywords = keywords.concat(pageKeywords);
      } catch (e) {
        logger.error(e.message);
      }
    }

    return {
      keywords
    };
  }

  async _getJobLinks(page) {
    const selector = "[data-tn-element=jobTitle]";
    await page.waitFor(selector);
    const jobLinks = await page.$$(selector);
    const links = [];

    for (const link of jobLinks) {
      const href = await link.getProperty("href");
      const url = await href.jsonValue();
      links.push(url);
    }

    return links;
  }

  async _getDescriptionText(page) {
    const selector = ".jobsearch-JobComponent-description";
    const descElement = await page.$(selector);
    const textContent = await descElement.getProperty("textContent");
    return await textContent.jsonValue();
  }

  _getUrl(region, title) {
    return `${config.indeed.regions[region].host}/jobs?q=${title}&l=&radius=25&sort=date&limit=50`;
  }
}

module.exports = IndeedService;
