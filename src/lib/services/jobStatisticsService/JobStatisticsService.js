const client = require("prom-client");
const keywords = require("./keywords");
const logger = require("../../logging/logger");

const toolGauge = new client.Gauge({
  name: "tool_reference_gauge",
  help: "tool_references",
  labelNames: ["region", "title", "tool"]
});

class JobStatisticsService {
  storeToolReferences(region, title, stats) {
    logger.info("storeToolReferences", region, title);
    const labels = {
      region,
      title
    };

    Object.keys(stats).forEach(name => {
      const toolLabels = Object.assign({}, labels, { tool: name });
      toolGauge.set(toolLabels, stats[name] || 0);
    });

    return stats;
  }

  getKeywords(descriptionText) {
    return keywords
      .filter(keyword => keyword.regex.test(descriptionText))
      .map(keyword => keyword.name);
  }

  createStatsObject(keywordsArray) {
    return keywordsArray.reduce(this._getStats, {});
  }

  _getStats(obj, label) {
    if (!obj[label]) {
      obj[label] = 1;
    } else {
      obj[label] += 1;
    }

    return obj;
  }
}

module.exports = JobStatisticsService;
