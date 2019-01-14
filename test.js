// file for testing services
const services = require("./src/lib/services");

(async () => {
  const result = await services.googleTrendService.getTrends();

  console.log(result);
  console.log("--------------------------");
})();
