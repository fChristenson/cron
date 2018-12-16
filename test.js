// file for testing services
const services = require("./src/lib/services");

services.questionService.getQuestions().then(re => {
  console.log(re);
  console.log("--------------------------");
});
