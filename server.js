const app = require("./src/app");
const logger = require("./src/lib/logging/logger");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info("Running server on port:", port);
});
