export const actions = {
  NEXT: "NEXT",
  MUTE: "MUTE"
};

export class PlayActionVO {
  constructor() {
    this.action = "";
  }
  setAction(action) {
    this.action = action;
    return this;
  }
  actionDone() {
    this.action = "";
    return this;
  }
}
