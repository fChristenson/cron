// file for testing services
const googleTrends = require("google-trends-api");
const services = require("./src/lib/services");

services.googleTrendService.getTrends().then(re => {
  console.log(re);
  console.log("--------------------------");
});
