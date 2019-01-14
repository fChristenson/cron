const logger = require("../../logging/logger");
const client = require("prom-client");
const googleTrends = require("google-trends-api");

const googleTrendGauge = new client.Gauge({
  name: "google_trend_gauge",
  help: "google_trend_gauge",
  labelNames: ["group", "keyword"]
});

class GoogleTrendService {
  async getTrends() {
    logger.info("getTrends");

    const lowLevelTrend = await this.getLowLevelTrend();
    const jobLanguagesTrend = await this.getJobLanguagesTrend();
    const spaTrend = await this.getSpaTrend();
    const coolLanguagesTrend = await this.getCoolLanguagesTrend();
    const programmingStyleTrend = await this.getProgrammingStyleTrend();

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

  async getProgrammingStyleTrend() {
    logger.info("getProgrammingStyleTrend");
    const values = await this._makeRequest([
      "Object oriented programming",
      "Functional programming",
      "Procedural programming"
    ]);
    return [
      { label: "object_oriented_programming", value: values[0] },
      { label: "functional_programming", value: values[1] },
      { label: "procedural_programming", value: values[2] }
    ];
  }

  async getLowLevelTrend() {
    logger.info("getLowLevelTrend");
    const values = await this._makeRequest(["golang", "rust", "c++", "c"]);
    return [
      { label: "golang", value: values[0] },
      { label: "rust", value: values[1] },
      { label: "c++", value: values[2] },
      { label: "c", value: values[3] }
    ];
  }

  async getJobLanguagesTrend() {
    logger.info("getJobLanguagesTrend");
    const values = await this._makeRequest([
      "java",
      "c#",
      "python",
      "php",
      "javascript"
    ]);
    return [
      { label: "java", value: values[0] },
      { label: "c#", value: values[1] },
      { label: "python", value: values[2] },
      { label: "php", value: values[3] },
      { label: "javascript", value: values[4] }
    ];
  }

  async getCoolLanguagesTrend() {
    logger.info("getCoolLanguagesTrend");
    const values = await this._makeRequest([
      "golang",
      "rust",
      "node",
      "elixir"
    ]);
    return [
      { label: "golang", value: values[0] },
      { label: "rust", value: values[1] },
      { label: "node", value: values[2] },
      { label: "elixir", value: values[3] }
    ];
  }

  async getSpaTrend() {
    logger.info("getSpaTrend");
    const values = await this._makeRequest(["react", "angular", "vue"]);
    return [
      { label: "react", value: values[0] },
      { label: "angular", value: values[1] },
      { label: "vue", value: values[2] }
    ];
  }

  async _makeRequest(keyword) {
    try {
      const response = await googleTrends.interestOverTime({
        keyword,
        category: 730 // Development Tools: 730
      });
      return JSON.parse(response).default.averages;
    } catch (error) {
      logger.error(error.stack);
      return [];
    }
  }
}

module.exports = GoogleTrendService;
