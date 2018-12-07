const express = require("express");
const { outlookService, mailgunService } = require("./lib/services");
const app = express();

app.use(express.json());

app.get("/outlook", async (req, res) => {
  const isAvailable1 = await outlookService.accountNameIsAvailable(
    "mathiasjohansson"
  );
  const isAvailable2 = await outlookService.accountNameIsAvailable(
    "mathias.johansson"
  );
  const message = `Names available mathiasjohansson: ${isAvailable1} mathias.johansson: ${isAvailable2} is available`;
  console.log(message);
  console.log("--------------------------");
  if (isAvailable1 || isAvailable2) {
    await mailgunService.sendEmail(
      "johansson.mathias@outlook.com",
      "Name is available",
      message
    );
  }
  res.end();
});

module.exports = app;
