const OutlookService = require("./outlookService/OutlookService");
const OutlookEmailService = require("./outlookService/OutlookEmailService");
const MailgunService = require("./mailgunService/MailgunService");

const mailgunService = new MailgunService();
const outlookService = new OutlookService();
const outlookEmailService = new OutlookEmailService(
  mailgunService,
  outlookService
);

module.exports = {
  mailgunService,
  outlookEmailService,
  outlookService
};
