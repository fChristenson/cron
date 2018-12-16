class QuestionService {
  constructor(quoraDigestService) {
    this.topics = [
      "Computer-Programming",
      "Programming-Languages",
      "Computer-Programming-Advice",
      "Web-Development",
      "JavaScript-programming-language"
    ];
    this.quoraDigestService = quoraDigestService;
  }
  async getQuestions() {
    const promises = this.topics.map(topic =>
      this.quoraDigestService.getQuestions(topic)
    );
    const questions = await Promise.all(promises);

    return questions.reduce(this._flatten, []).filter(this._uniq).sort();
  }

  _flatten(array, item) {
    return array.concat(item);
  }

  _uniq(value, index, self) {
    return self.indexOf(value) === index;
  }
}

module.exports = QuestionService;
