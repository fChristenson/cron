const axios = require("axios");
const config = require("../../../config/config");
const logger = require("../../logging/logger");
const repoData = require("./repoData");
const client = require("prom-client");

const githubStatsGauge = new client.Gauge({
  name: "github_stats_gauge",
  help: "github_stats_gauge",
  labelNames: ["owner", "repo", "stat"]
});

class GithubService {
  constructor() {
    const headers = {
      Authorization: `Basic ${config.github.basicAuthentication}`
    };
    this.axios = axios.create({
      headers
    });
  }

  async getStats() {
    logger.info("getStats");
    const popularityPromises = repoData.map(repoData =>
      this.getPopularity(repoData.owner, repoData.repo)
    );

    const totalCommitPromises = repoData.map(repoData =>
      this.getTotalCommits(repoData.owner, repoData.repo)
    );

    const promises = popularityPromises.concat(totalCommitPromises);
    const result = await Promise.all(promises);

    result.forEach(data => {
      const { owner, repo, label } = data;

      if (label === "totalCommits") {
        githubStatsGauge.set(
          { owner, repo, stat: "total_commits" },
          data.totalCommits
        );
      }

      if (label === "popularity") {
        githubStatsGauge.set({ owner, repo, stat: "stars" }, data.stars);
        githubStatsGauge.set({ owner, repo, stat: "forks" }, data.forks);
        githubStatsGauge.set({ owner, repo, stat: "watchers" }, data.watchers);
      }
    });

    return result;
  }

  async getTotalCommits(owner, repo) {
    logger.info("getTotalCommits", owner, repo);
    try {
      const res = await this.axios(
        `https://api.github.com/repos/${owner}/${repo}/stats/contributors`
      );

      const totalCommits = res.data
        .map(d => d.total)
        .reduce((acc, i) => acc + i, 0);

      return { label: "totalCommits", owner, repo, totalCommits };
    } catch (error) {
      logger.error(error.stack);
      return {};
    }
  }

  async getPopularity(owner, repo) {
    logger.info("getPopularity", owner, repo);
    try {
      const res = await this.axios(
        `https://api.github.com/repos/${owner}/${repo}`
      );

      return {
        label: "popularity",
        repo,
        owner,
        stars: res.data.stargazers_count,
        forks: res.data.forks_count,
        watchers: res.data.watchers_count
      };
    } catch (error) {
      logger.error(error.stack);
      return {};
    }
  }
}

module.exports = GithubService;
