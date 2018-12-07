const express = require("express");
const { outlookService } = require("./lib/services");
const app = express();

app.use(express.json());

app.get("/outlook", async (req, res) => {
  const isAvailable1 = await outlookService.accountNameIsAvailable(
    "mathiasjohansson"
  );
  const isAvailable2 = await outlookService.accountNameIsAvailable(
    "mathias.johansson"
  );
  console.log(
    `Names available mathiasjohansson: ${isAvailable1} mathias.johansson: ${isAvailable2} is available`
  );
  console.log("--------------------------");
  res.end("foo");
});

module.exports = app;
