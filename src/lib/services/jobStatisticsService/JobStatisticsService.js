const config = require("../../../config/config");
const client = require("prom-client");

const reactGauge = new client.Gauge({
  name: "react_reference_gauge",
  help: "react_references",
  labelNames: ["region", "title"]
});
const vueGauge = new client.Gauge({
  name: "vue_reference_gauge",
  help: "vue_references",
  labelNames: ["region", "title"]
});
const angularGauge = new client.Gauge({
  name: "angular_reference_gauge",
  help: "angular_references",
  labelNames: ["region", "title"]
});

class JobStatisticsService {
  constructor() {
    this.key = config.gcp.dataStore.jobStatsKey;
  }

  storeSpaReferences(region, title, stats) {
    console.log("storeSpaReferences", region, title);
    console.log("--------------------------");
    const labels = {
      region,
      title
    };
    vueGauge.set(labels, stats.vue || 0);
    reactGauge.set(labels, stats.react || 0);
    angularGauge.set(labels, stats.angular || 0);
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
