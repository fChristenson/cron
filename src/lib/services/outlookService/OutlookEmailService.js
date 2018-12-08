const config = require("../../../config/config");

class OutlookEmailService {
  constructor(mailgunService, outlookService) {
    this.mailgunService = mailgunService;
    this.outlookService = outlookService;
  }

  async sendNameAvailableEmail() {
    const name1 = this.outlookService.name1;
    const name2 = this.outlookService.name2;
    const isAvailable1 = await this.outlookService.accountNameIsAvailable(
      name1
    );
    const isAvailable2 = await this.outlookService.accountNameIsAvailable(
      name2
    );
    const nameAvailableMessage = `Names available ${name1}: ${isAvailable1} ${name2}: ${isAvailable2}`;

    return this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      "Name is available",
      nameAvailableMessage
    );
  }

  async sendEmailReminder() {
    console.log("Sending Monday email");
    console.log("--------------------------");
    const name1 = this.outlookService.name1;
    const name2 = this.outlookService.name2;
    const reminderSubject = "The name check is still running";
    const reminderMessage = `The check for the outlook names ${name1} & ${name2} is still running`;

    await this.mailgunService.sendEmail(
      config.emails.fredrikChristenson,
      reminderSubject,
      reminderMessage
    );
    await this.mailgunService.sendEmail(
      config.emails.mathiasJohansson,
      reminderSubject,
      reminderMessage
    );
  }
}

module.exports = OutlookEmailService;
