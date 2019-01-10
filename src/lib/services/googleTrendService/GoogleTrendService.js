const axios = require("axios");
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

    const promises = [
      this.getLowLevelTrend(),
      this.getJobLanguagesTrend(),
      this.getSpaTrend()
    ];

    const trends = await Promise.all(promises);
    const [lowLevelTrend, jobLanguagesTrend, spaTrend] = trends;

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

    return trends;
  }

  async getLowLevelTrend() {
    logger.info("getLowLevelTrend");
    try {
      const res = await axios.get(
        "https://trends.google.com/trends/api/widgetdata/multiline?hl=sv&tz=-60&req=%7B%22time%22:%222018-12-10+2019-01-10%22,%22resolution%22:%22DAY%22,%22locale%22:%22sv%22,%22comparisonItem%22:%5B%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F09gbxjr%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F0dsbpg6%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F0jgqg%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F01t6b%22%7D%5D%7D%7D%5D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:31%7D%7D&token=APP6_UEAAAAAXDjcH7S5of__LwJWlf1BDSpref961egh&tz=-60"
      );
      const values = this._parseResponse(res.data);
      return [
        { label: "golang", value: values[0] },
        { label: "rust", value: values[1] },
        { label: "c++", value: values[2] },
        { label: "c", value: values[3] }
      ];
    } catch (error) {
      logger.error(error.stack);
    }
  }

  async getJobLanguagesTrend() {
    logger.info("getJobLanguagesTrend");
    try {
      const res = await axios.get(
        "https://trends.google.com/trends/api/widgetdata/multiline?hl=sv&tz=-60&req=%7B%22time%22:%222018-12-10+2019-01-10%22,%22resolution%22:%22DAY%22,%22locale%22:%22sv%22,%22comparisonItem%22:%5B%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F07sbkfb%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F07657k%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F05z1_%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F060kv%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F02p97%22%7D%5D%7D%7D%5D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:31%7D%7D&token=APP6_UEAAAAAXDjazf2TDDcwoBBQ_WjQ6CKqTOlVrZ29&tz=-60"
      );
      const values = this._parseResponse(res.data);
      return [
        { label: "java", value: values[0] },
        { label: "c#", value: values[1] },
        { label: "python", value: values[2] },
        { label: "php", value: values[3] },
        { label: "javascript", value: values[4] }
      ];
    } catch (error) {
      logger.error(error.stack);
    }
  }

  async getSpaTrend() {
    logger.info("getSpaTrend");
    try {
      const res = await axios.get(
        "https://trends.google.com/trends/api/widgetdata/multiline?hl=sv&tz=-60&req=%7B%22time%22:%222018-12-10+2019-01-10%22,%22resolution%22:%22DAY%22,%22locale%22:%22sv%22,%22comparisonItem%22:%5B%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F012l1vxv%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fm%2F0j45p7w%22%7D%5D%7D%7D,%7B%22geo%22:%7B%7D,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22ENTITY%22,%22value%22:%22%2Fg%2F11c0vmgx5d%22%7D%5D%7D%7D%5D,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22IZG%22,%22category%22:31%7D%7D&token=APP6_UEAAAAAXDjZM4bCWY7loJBV474e0qD1CmyyUy0V&tz=-60"
      );
      const values = this._parseResponse(res.data);
      return [
        { label: "react", value: values[0] },
        { label: "angular", value: values[1] },
        { label: "vue", value: values[2] }
      ];
    } catch (error) {
      logger.error(error.stack);
    }
  }

  _parseResponse(str) {
    const jsonStr = str.slice(str.indexOf("{"));
    return JSON.parse(jsonStr).default.averages;
  }
}

module.exports = GoogleTrendService;
