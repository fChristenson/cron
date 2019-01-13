const puppeteer = require("puppeteer");
const logger = require("../../logging/logger");
const client = require("prom-client");

const googleTrendGauge = new client.Gauge({
  name: "google_trend_gauge",
  help: "google_trend_gauge",
  labelNames: ["group", "keyword"]
});

class GoogleTrendService {
  async getTrends() {
    logger.info("getTrends");

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    });
    const page = await browser.newPage();

    const lowLevelTrend = await this.getLowLevelTrend(page);
    const jobLanguagesTrend = await this.getJobLanguagesTrend(page);
    const spaTrend = await this.getSpaTrend(page);
    const coolLanguagesTrend = await this.getCoolLanguagesTrend(page);
    const programmingStyleTrend = await this.getProgrammingStyleTrend(page);

    await browser.close();

    lowLevelTrend.forEach(record =>
      googleTrendGauge.set(
        { group: "low_level_trend", keyword: record.label },
        record.value
      )
    );

    jobLanguagesTrend.forEach(record =>
      googleTrendGauge.set(
        { group: "job_languages_trend", keyword: record.label },
        record.value
      )
    );

    spaTrend.forEach(record =>
      googleTrendGauge.set(
        { group: "spa_trend", keyword: record.label },
        record.value
      )
    );

    coolLanguagesTrend.forEach(record => {
      googleTrendGauge.set(
        { group: "cool_languages_trend", keyword: record.label },
        record.value
      );
    });

    programmingStyleTrend.forEach(record => {
      googleTrendGauge.set(
        { group: "programming_style_trend", keyword: record.label },
        record.value
      );
    });

    return trends;
  }

  async getProgrammingStyleTrend(page) {
    logger.info("getProgrammingStyleTrend");
    const values = await this._makeRequest(
      page,
      "https://trends.google.com/trends/explore?cat=31&date=today%201-m&q=%2Fm%2F05prj,%2Fm%2F02ykw,%2Fm%2F05yd5"
    );
    return [
      { label: "object_oriented_programming", value: values[0] },
      { label: "functional_programming", value: values[1] },
      { label: "procedural_programming", value: values[2] }
    ];
  }

  async getLowLevelTrend(page) {
    logger.info("getLowLevelTrend");
    const values = await this._makeRequest(
      page,
      "https://trends.google.com/trends/explore?cat=31&date=today%201-m&q=%2Fm%2F09gbxjr,%2Fm%2F0dsbpg6,%2Fm%2F0jgqg,%2Fm%2F01t6b"
    );
    return [
      { label: "golang", value: values[0] },
      { label: "rust", value: values[1] },
      { label: "c++", value: values[2] },
      { label: "c", value: values[3] }
    ];
  }

  async getJobLanguagesTrend(page) {
    logger.info("getJobLanguagesTrend");
    const values = await this._makeRequest(
      page,
      "https://trends.google.com/trends/explore?cat=31&date=today%201-m&q=java,%2Fm%2F07657k,%2Fm%2F05z1_,%2Fm%2F060kv,%2Fm%2F02p97"
    );
    return [
      { label: "java", value: values[0] },
      { label: "c#", value: values[1] },
      { label: "python", value: values[2] },
      { label: "php", value: values[3] },
      { label: "javascript", value: values[4] }
    ];
  }

  async getCoolLanguagesTrend(page) {
    logger.info("getCoolLanguagesTrend");
    const values = await this._makeRequest(
      page,
      "https://trends.google.com/trends/explore?cat=31&date=today%201-m&q=%2Fm%2F09gbxjr,%2Fm%2F0dsbpg6,%2Fm%2F0bbxf89,%2Fm%2F0pl075p"
    );
    return [
      { label: "golang", value: values[0] },
      { label: "rust", value: values[1] },
      { label: "node", value: values[2] },
      { label: "elixir", value: values[3] }
    ];
  }

  async getSpaTrend(page) {
    logger.info("getSpaTrend");
    const values = await this._makeRequest(
      page,
      "https://trends.google.com/trends/explore?cat=31&date=today%201-m&geo=US&q=%2Fm%2F012l1vxv,%2Fm%2F0j45p7w,%2Fg%2F11c0vmgx5d"
    );
    return [
      { label: "react", value: values[0] },
      { label: "angular", value: values[1] },
      { label: "vue", value: values[2] }
    ];
  }

  async _makeRequest(page, url) {
    try {
      await page.goto(url);
      const response = await page.waitForResponse(req =>
        req.url().includes("multiline")
      );
      const text = await response.text();
      const values = this._parseResponse(text);
      return values;
    } catch (error) {
      logger.error(error.stack);
      return [];
    }
  }

  _parseResponse(str) {
    const jsonStr = str.slice(str.indexOf("{"));
    return JSON.parse(jsonStr).default.averages;
  }
}

module.exports = GoogleTrendService;
