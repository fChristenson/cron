// file for testing services
const services = require("./src/lib/services");

services.githubService.getStats().then(re => {
  console.log(re);
  console.log("--------------------------");
});
