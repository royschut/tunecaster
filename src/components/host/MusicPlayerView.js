import React from "react";

import YTPlayer from "../general/YTPlayer";

export default class MusicPlayerView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="videoWrapper">
          <YTPlayer
            width="100%"
            player="0"
            doPlay={this.props.doPlay0}
            visible={this.props.visible0}
            ytid={this.props.ytid0}
            mute={this.props.mute}
            onBuffered={duration => this.props.onBuffered(0, duration)}
            onUserPause={val => this.props.onUserPause(val)}
            onEnded={() => this.props.onVidEnded()}
          />
          <YTPlayer
            width="100%"
            player="1"
            doPlay={this.props.doPlay1}
            visible={this.props.visible1}
            ytid={this.props.ytid1}
            mute={this.props.mute}
            onBuffered={duration => this.props.onBuffered(1, duration)}
            onUserPause={val => this.props.onUserPause(val)}
            onEnded={() => this.props.onVidEnded()}
          />
        </div>
      </React.Fragment>
    );
  }
}
