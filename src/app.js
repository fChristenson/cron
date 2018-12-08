const express = require("express");
const { outlookService, outlookEmailService } = require("./lib/services");
const app = express();

app.use(express.json());

app.get("/outlook", async (req, res) => {
  const name1 = outlookService.name1;
  const name2 = outlookService.name2;
  const isAvailable1 = await outlookService.accountNameIsAvailable(name1);
  const isAvailable2 = await outlookService.accountNameIsAvailable(name2);
  const message = `Names available ${name1}: ${isAvailable1} ${name2}: ${isAvailable2}`;
  console.log(message);
  console.log("--------------------------");

  const isMonday = new Date().getDay() === 1;

  if (isAvailable1 || isAvailable2) {
    await outlookEmailService.sendNameAvailableEmail();
  } else if (isMonday) {
    await outlookEmailService.sendEmailReminder();
  }

  res.end();
});

module.exports = app;
