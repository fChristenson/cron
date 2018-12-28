const Keyword = (name, regex) => {
  return {
    name,
    regex: !regex ? new RegExp(`\\b${name}\\b`, "i") : regex
  };
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
  Keyword("ms sql", /((ms|microsoft)-sql|(ms|microsoft) sql)|mssql/i),
  Keyword("ms access", /(ms|microsoft) access|(ms|microsoft)-access/i),
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
  Keyword("c#", /c#|\.net/i),
  Keyword("python"),
  Keyword("golang"),
  Keyword("javascript"),
  Keyword("php"),
  Keyword("node"),
  Keyword("ruby"),
  Keyword("f#", /f#/i),
  Keyword("ocaml"),
  Keyword("closure"),
  Keyword("haskell"),
  Keyword("c++", /c\+\+/i),
  Keyword("c"),
  Keyword("r"),
  Keyword("scala"),
  Keyword("swift"),
  Keyword("rust"),
  Keyword("elixir"),
  Keyword("erlang"),
  Keyword("objective-c", /\bobjective-c|objective c\b/i),
  Keyword("kotlin")
];

module.exports = spaFrameworks.concat(languages).concat(databases);
