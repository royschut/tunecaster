import React from "react";
import MusicPlayerView from "./MusicPlayerView";
import PlayController from "../../control/PlayController";

export default class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: [],

      ytid0: null,
      ytid1: null,

      visible0: true,
      visible1: false,
      doPlay0: false,
      doPlay1: false,

      duration0: null,
      duration1: null,

      mayStart: false,
      userPause: false,
      mute: false
    };
  }
  onBuffered(player, duration) {
    if (!this.state.mayStart && player === 0) this.setState({ mayStart: true });
    //todo this.setState({ ["duration" + player]: duration });
  }
  render() {
    return (
      <React.Fragment>
        <PlayController
          playlistVO={this.props.playlistVO}
          playActionVO={this.props.playActionVO}
          runtime={this.props.mixstyleVO.getRuntime()}
          fadetime={this.props.mixstyleVO.getFadetime()}
          mayStart={this.state.mayStart}
          userPause={this.state.userPause}
          setYtid={(pl, ytid) => this.setState({ ["ytid" + pl]: ytid })}
          setVisible={(pl, val) => this.setState({ ["visible" + pl]: val })}
          setDoPlay={(pl, val) => this.setState({ ["doPlay" + pl]: val })}
          setActiveSongs={(s1, s2) => this.props.setActiveSongs(s1, s2)}
          onActionDone={() => this.props.onActionDone()}
          onMute={() => this.setState({ mute: !this.state.mute })}
          onAllFinished={() => this.props.onAllFinished()}
        />
        <MusicPlayerView
          doPlay0={this.state.doPlay0}
          doPlay1={this.state.doPlay1}
          visible0={this.state.visible0}
          visible1={this.state.visible1}
          ytid0={this.state.ytid0}
          ytid1={this.state.ytid1}
          mute={this.state.mute}
          onBuffered={(pl, duration) => this.onBuffered(pl, duration)}
          onUserPause={val => this.setState({ userPause: val })}
          onVidEnded={() => this.props.onVidEnded()}
        />
      </React.Fragment>
    );
  }
}
