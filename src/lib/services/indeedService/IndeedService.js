const puppeteer = require("puppeteer");
const config = require("../../../config/config");

class IndeedService {
  constructor(jobStatisticsService) {
    this.jobStatisticsService = jobStatisticsService;
  }

  async getJobPostings(region, title) {
    console.log("getJobPostings", region, title);
    console.log("--------------------------");
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
      console.log(`Visitied: ${this._getUrl(region, title)}`);
      console.log("--------------------------");
      const results = await this._getResults(page);
      await browser.close();
      const stats = this.jobStatisticsService.createStatsObject(results);
      this.jobStatisticsService.storeSpaReferences(region, title, stats);
      return stats;
    } catch (error) {
      console.log(error.message);
      console.log("--------------------------");
      return [];
    }
  }

  async _getResults(page) {
    const selector =
      ".jobsearch-SerpJobCard, .row, .result, .clickcard, .vjs-highlight";
    const posts = await page.$$(selector);
    let results = [];
    for (const post of posts) {
      await post.click();
      await page.waitFor(1000);
      const references = await this._getToolReferences(page);
      results = results.concat(references);
    }

    return results;
  }

  async _getToolReferences(page) {
    const selector = "#vjs-desc";
    await page.waitFor(selector);
    const descElement = await page.$(selector);
    const textContent = await descElement.getProperty("textContent");
    const json = await textContent.jsonValue();
    return this.jobStatisticsService.getKeywords(json);
  }

  _getUrl(region, title) {
    return `${config.indeed.regions[region].host}/jobs?q=${title}&l=&radius=25&sort=date&limit=50`;
  }
}

module.exports = IndeedService;
