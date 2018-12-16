const config = require("../../../config/config");

class OutlookEmailService {
  constructor(mailgunService, outlookService) {
    this.mailgunService = mailgunService;
    this.outlookService = outlookService;
  }

  async sendNameAvailableEmail(message) {
    console.log("sendNameAvailableEmail", message);
    console.log("--------------------------");
    return this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      "Name is available",
      message
    );
  }

  async sendEmailReminder(message) {
    console.log("sendEmailReminder", message);
    console.log("--------------------------");
    const reminderSubject = "The name check is still running";

    await this.mailgunService.sendEmail(
      config.emails.fredrikChristenson,
      reminderSubject,
      message
    );
    await this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      reminderSubject,
      message
    );
  }
}

module.exports = OutlookEmailService;
