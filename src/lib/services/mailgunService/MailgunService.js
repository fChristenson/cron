const mailgun = require("mailgun-js");
const config = require("../../../config/config");
const client = mailgun({
  apiKey: config.mailgun.apiKey,
  domain: config.mailgun.domain
});

class MailgunService {
  sendEmail(to, subject, text) {
    const data = {
      from: `Fidde <noreply@${config.mailgun.domain}>`,
      to,
      subject,
      text
    };

    return client.messages().send(data);
  }
}

module.exports = MailgunService;
