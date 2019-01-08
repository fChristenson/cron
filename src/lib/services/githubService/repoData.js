const RepoData = (owner, repo) => {
  return {
    owner,
    repo
  };
};

module.exports = [
  RepoData("facebook", "react"),
  RepoData("angular", "angular"),
  RepoData("vuejs", "vue"),
  RepoData("emberjs", "ember.js"),
  RepoData("developit", "preact"),
  RepoData("meteor", "meteor"),
  RepoData("golang", "go"),
  RepoData("rust-lang", "rust"),
  RepoData("nodejs", "node"),
  RepoData("php", "php-src"),
  RepoData("ruby", "ruby")
];
