import axios from "axios";
import Vars from "./Vars";

export default class DataSource {
  talkWithServer(method, data, callBack) {
    let talkObj = {
      method: "post",
      url: Vars.SERVER + "?method=" + method,
      data: data
    };
    axios(talkObj).then(
      result => {
        if (result.data.success) {
          callBack(result.data);
        } else {
          callBack(result);
        }
      },
      error => {
        console.log("error: " + error.message);
      }
    );
  }
  //PUBLIC METHODS
  createHost(hostname, callBack) {
    this.talkWithServer("createhost&hostname=" + hostname, "", callBack);
  }
  loadHost(hostcode, callBack) {
    this.talkWithServer("loadhost&hostcode=" + hostcode, hostcode, callBack);
  }
  resetRetrieved(hostid) {
    this.talkWithServer("resetRetrieved&hostid=" + hostid, "", () => {});
  }
  getprelists(callBack) {
    this.talkWithServer("getprelists", "", result => callBack(result.data));
  }
  addSong(hostId, ytid, title) {
    this.talkWithServer(
      "addsong&hostid=" + hostId + "&ytid=" + ytid + "&title=" + title,
      "",
      () => {}
    );
  }
  sendMessage(hostId, msg, user, callBack) {
    this.talkWithServer(
      "sendmessage&hostid=" + hostId + "&msg=" + msg + "&user=" + user,
      "",
      callBack
    );
  }
  getMessages(hostId, callBack) {
    this.talkWithServer("getmessages&hostid=" + hostId, "", result =>
      callBack(result.data)
    );
  }
  getNewSongs(hostId, callBack) {
    this.talkWithServer("getnewsongs&hostid=" + hostId, "", result =>
      callBack(result.data)
    );
  }
}
