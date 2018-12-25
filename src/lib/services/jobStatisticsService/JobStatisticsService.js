const client = require("prom-client");
const tools = require("./tools");

const toolGauge = new client.Gauge({
  name: "tool_reference_gauge",
  help: "tool_references",
  labelNames: ["region", "title", "tool"]
});

class JobStatisticsService {
  storeToolReferences(region, title, stats) {
    console.log("storeToolReferences", region, title);
    console.log("--------------------------");
    const labels = {
      region,
      title
    };

    tools.forEach(name => {
      const toolLabels = Object.assign({}, labels, { tool: name });
      toolGauge.set(toolLabels, stats[name] || 0);
    });
  }

  getKeywords(descriptionText) {
    return descriptionText
      .split(/\s|\n|\t|\/|;|,|\.|\r|\(|\)|\[|\]|\?|'|"|:|!|[0-9]/)
      .filter(str => !!str)
      .map(str => str.trim().toLowerCase())
      .filter((val, index, self) => self.indexOf(val) === index);
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
