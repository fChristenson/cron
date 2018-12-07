const OutlookService = require("./outlookService/OutlookService");
const MailgunService = require("./mailgunService/MailgunService");

module.exports = {
  outlookService: new OutlookService(),
  mailgunService: new MailgunService()
};
