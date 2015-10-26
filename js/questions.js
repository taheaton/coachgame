let Question = function (obj) {
  obj = obj || {};
  this.id = obj.id;
  this.color = obj.color;
  this.question = obj.question;
  this.choices = obj.choices;
  this.correctAnswer = obj.correctAnswer;

};
export default Question;