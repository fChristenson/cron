// file for testing services
const services = require("./src/lib/services");

services.indeedService.getJobPostings("se", "utvecklare").then(re => {
  console.log(re);
  console.log("--------------------------");
});
