const client = require("prom-client");
const keywords = require("./keywords");
const logger = require("../../logging/logger");

const toolGauge = new client.Gauge({
  name: "tool_reference_gauge",
  help: "tool_references",
  labelNames: ["region", "title", "tool"]
});

const yearsOfExperienceGauge = new client.Gauge({
  name: "years_of_experience",
  help: "years_of_experience",
  labelNames: ["region", "title", "years"]
});

class JobStatisticsService {
  constructor() {
    const to = "(to|-|till)";
    const experience = "(experience|erfarenhet)";
    const years = "(years?|års?)";
    const regex1 = `([\\d+\\.,]+\\s?${to}[\\d+\\.,]*\\s*${years}).*?${experience}`;
    const regex2 = `(\\d+\\+?\\s?${years}).*?${experience}`;
    const regex3 = `${experience}.*([\\d+\\.,]+\\s?${to}[\\d+\\.,]*\\s*${years})`;
    const regex4 = `${experience}.*?(\\d+\\+?\\s?${years})`;
    const result = new RegExp(`${regex1}|${regex2}|${regex3}|${regex4}`);
    this.yearsOfExperienceRegex = result;
  }

  storeYearsOfExperienceReferences(region, title, stats) {
    logger.info("storeYearsOfExperienceReferences");
    const labels = {
      region,
      title
    };

    Object.keys(stats).forEach(name => {
      const yearLabels = Object.assign({}, labels, { years: name });
      yearsOfExperienceGauge.set(yearLabels, stats[name] || 0);
    });

    return stats;
  }

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

  getYearsOfExperience(descriptionText) {
    const matches = this.yearsOfExperienceRegex.exec(descriptionText) || [];
    const result = matches
      .slice(1, matches.length)
      .filter(val => val && /\d/.test(val))
      .map(val => val.replace(/years?|års?|\+/ig, ""))
      .map(val => val.trim())
      .map(this._expandRange)
      .reduce((acc, val) => acc.concat(val), []);

    return result.length > 0 ? result : ["-1"];
  }

  _expandRange(val) {
    if (/-|to/i.test(val) === false) return val;

    const range = val
      .split(/to|-/i)
      .map(val => val.trim())
      .map(val => parseInt(val));

    const result = [];

    for (let i = range[0]; i <= range[1]; i++) {
      result.push(i.toString());
    }

    return result;
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
