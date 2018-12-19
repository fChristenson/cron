const config = require("../../../config/config");
const DataStore = require("@google-cloud/datastore");
const path = require("path");
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
    this.dataStore = new DataStore({
      projectId: config.gcp.projectId,
      keyFilename: path.resolve(__dirname, "../../../../service_account.json")
    });
  }

  listStats(region, title) {
    console.log("listStats", region, title);
    console.log("--------------------------");
    const query = this.dataStore
      .createQuery(this.key)
      .filter("region", "=", region)
      .filter("title", "=", title);

    return this.dataStore.runQuery(query);
  }

  /**
   * Store a stat record in datastore
   * 
   * @param {String} region the name of the region
   * @param {String} title the job title
   * @param {Object} stats object with stats {<word>: <Number>}
   */
  async saveRecord(region, title, stats) {
    console.log("saveRecord", region, title);
    console.log("--------------------------");
    const createdAt = Date.now();
    const data = {
      createdAt,
      region,
      title,
      stats
    };
    const key = this.dataStore.key([this.key]);

    return this.dataStore.save({
      key,
      data
    });
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
      .split(/\s|\n|\t|\/|;|,|\.|\r|\(|\)|\[|\]|\?|'|"|:|!/)
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
