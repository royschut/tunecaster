import Vars from "../data/Vars";

export default class MixstyleVO {
  constructor() {
    this.mixstyles = Vars.mixstyles;
    this.curMixstyle = Vars.defaultMixstyle;
  }
  setCurMixstyle(val) {
    this.curMixstyle = val;
    return this;
  }
  cur() {
    return this.mixstyles[this.curMixstyle - 1];
  }
  getName() {
    return this.cur().name + " " + this.cur().descr;
  }
  getRuntime() {
    return this.cur().runtime;
  }
  getFadetime() {
    return this.cur().fadetime;
  }
}
