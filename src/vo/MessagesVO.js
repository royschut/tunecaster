export default class MessagesVO {
  constructor() {
    this.messages = [];
  }
  getMessages() {
    let ret = this.messages.slice(-5);
    return ret;
  }
  addMessages(msgs) {
    if (msgs.length) this.messages = this.messages.concat(msgs);
    return this;
  }
}
