// file for testing services
const services = require("./src/lib/services");

services.indeedService.getJobPostings("in", "software developer").then(re => {
  console.log(re);
  console.log("--------------------------");
});
