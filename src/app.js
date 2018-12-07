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

  const isMonday = new Date().getDay() === 1;

  if (isAvailable1 || isAvailable2) {
    await mailgunService.sendEmail(
      "johansson.mathias@outlook.com",
      "Name is available",
      message
    );
  } else if (isMonday) {
    console.log("Sending monday email");
    console.log("--------------------------");
    await mailgunService.sendEmail(
      "fredrik.christenson@gmail.com",
      "The name check is still running",
      "The check for the outlook names mathiasjohansson & mathias.johansson is still running"
    );
    await mailgunService.sendEmail(
      "johansson.mathias@outlook.com",
      "The name check is still running",
      "The check for the outlook names mathiasjohansson & mathias.johansson is still running"
    );
  }
  res.end();
});

module.exports = app;
