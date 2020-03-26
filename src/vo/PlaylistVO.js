import { shuffleArray } from "../tools/Tools";

export default class PlaylistVO {
  constructor(prelist = [], userlist = []) {
    this.prelist = prelist;
    this.userlist = userlist;
    this.types = [];

    this.preIndex = 0;
    this.userIndex = 0;
  }
  setPrelist(prelist) {
    this.prelist = prelist;
    this.types = this.makeTypesArray(prelist);
    return this;
  }
  makeTypesArray(prelist) {
    let types = [];
    prelist.forEach(item => {
      if (!types[item.prelistid] && item.id) {
        types[item.prelistid] = {
          id: item.prelistid,
          name: item.prelistname,
          active: true
        };
      }
    });
    return types;
  }
  addUserlist(userlist) {
    if (userlist.length) this.userlist = this.userlist.concat(userlist);
    return this;
  }
  toggleType(index) {
    this.types[index].active = !this.types[index].active;
    return this;
  }
  checkType(typeId) {
    if (!this.types[typeId]) return false;
    return this.types[typeId].active;
  }
  getPlayableList(listName) {
    let ret = this[listName].filter(item => this.isPlayable(item, listName));
    return ret;
  }
  isPlayable(item, listName) {
    let checkFilter =
      listName === "prelist" ? this.checkType(item.prelistid) : true;
    return !item.played && item.active !== false && checkFilter;
  }
  nextSong() {
    const findSong = listName => {
      let song;
      let index = this[listName].findIndex(item =>
        this.isPlayable(item, listName)
      );
      if (index > -1) {
        song = this[listName][index];
        this[listName][index].played = true;
      }
      return song;
    };
    let song = findSong("userlist");
    if (!song) song = findSong("prelist");

    return song;
  }
  moveSong(listName, from, to) {
    let fromIndex, toIndex;
    let pl =
      listName === "userlist" ? this.userlist.slice() : this.prelist.slice();
    pl.forEach((item, index) => {
      if (item.id === from) fromIndex = index;
      if (item.id === to) toIndex = index;
    });
    let cutitem = pl.splice(fromIndex, 1)[0];
    pl.splice(toIndex, 0, cutitem);

    if (listName === "userlist") this.userlist = pl;
    else this.prelist = pl;
    return this;
  }
  removeSong(listName, id) {
    let index = this[listName].findIndex(i => i.id === id);
    this[listName][index].active = false;
    console.log(this[listName]);
    return this;
  }
  shuffle(listName) {
    this[listName] = shuffleArray(this[listName]);
    return this;
  }
}
