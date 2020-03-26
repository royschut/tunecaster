import React from "react";
import Logo from "../general/Logo";
import PanelAddSong from "../general/PanelAddSong";
import HostVO from "../../vo/HostVO";
import DataSource from "../../data/DataSource";
import MsgSender from "./MsgSender";
import Vars from "../../data/Vars";
import Divider from "../general/Divider";

const INIT = 1;
const LOADING = 2;
const LOADED = 3;
const ERROR = 4;

export default class UserApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostVO: new HostVO(),
      status: INIT,
      msgStatus: "",
      error: ""
    };
    this.dataSource = new DataSource();
  }
  componentDidMount() {
    let hostcode = this.props.match.params.id;
    if (hostcode) {
      this.setState({ status: LOADING });
      this.dataSource.loadHost(hostcode, result => {
        if (result.data)
          this.setState({
            status: LOADED,
            hostVO: new HostVO(result.data.id, result.data.hostname, hostcode)
          });
        else this.setState({ status: ERROR, error: "No host with this code!" });
      });
    }
  }
  sendMsg(msg, user) {
    if (!msg) return;
    if (msg.length > Vars.maxMessageLength)
      msg = msg.substr(0, Vars.maxMessageLength);
    this.setState({ msgStatus: "Uploading" });
    this.dataSource.sendMessage(this.state.hostVO.id, msg, user, result => {
      if (result.id) this.setState({ msgStatus: "Done!" });
      else this.setState({ msgStatus: "Failed, try again later.." });
    });
  }
  castNow(ytid, title) {
    this.dataSource.addSong(this.state.hostVO.id, ytid, title);
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="Overlays">
            {this.state.status === LOADED && (
              <div className="panel">
                <h3>Cast to host: {this.state.hostVO.name}</h3>
                <PanelAddSong
                  onCastNow={(ytid, title) => this.castNow(ytid, title)}
                />
                <Divider />
                {}
                <MsgSender
                  onSendMsg={(msg, user) => this.sendMsg(msg, user)}
                  msgStatus={this.state.msgStatus}
                />
              </div>
            )}
            {this.state.status === ERROR && (
              <span>
                Error:
                <br /> {this.state.error}
              </span>
            )}
            {this.state.status === LOADING && <span>Loading..</span>}
          </div>
          <footer>
            <Logo />
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
