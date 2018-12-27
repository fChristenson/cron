const Keyword = (name, regex) => {
  return {
    name,
    regex: !regex ? new RegExp(`\\b${escapeRegExp(name)}\\b`, "i") : regex
  };
};

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const spaFrameworks = [
  Keyword("react"),
  Keyword("angular"),
  Keyword("vue"),
  Keyword("ember"),
  Keyword("preact"),
  Keyword("meteor"),
  Keyword("elm")
];

const databases = [
  Keyword("oracle"),
  Keyword("ms sql", /\b((ms|microsoft)-sql|(ms|microsoft) sql)|mssql\b/),
  Keyword("ms access", /\b(ms|microsoft) access|(ms|microsoft)-access\b/),
  Keyword("mysql"),
  Keyword("neo4j"),
  Keyword("redis"),
  Keyword("postgresql"),
  Keyword("mongodb"),
  Keyword("elasticsearch"),
  Keyword("mariadb"),
  Keyword("couchdb"),
  Keyword("arangodb"),
  Keyword("db2"),
  Keyword("sqlite")
];

const languages = [
  Keyword("java"),
  Keyword("c#", /c#|\.net/),
  Keyword("python"),
  Keyword("golang"),
  Keyword("javascript"),
  Keyword("php"),
  Keyword("node"),
  Keyword("ruby"),
  Keyword("f#", /f#/),
  Keyword("ocaml"),
  Keyword("closure"),
  Keyword("haskell"),
  Keyword("c++"),
  Keyword("c", /\b[\s\/,]c[\s\/,]\b/),
  Keyword("r", /\b[\s\/,]r[\s\/,]\b/),
  Keyword("scala"),
  Keyword("swift"),
  Keyword("rust"),
  Keyword("elixir"),
  Keyword("erlang"),
  Keyword("objective-c", /\bobjective-c|objective c\b/),
  Keyword("kotlin")
];

module.exports = spaFrameworks.concat(languages).concat(databases);
