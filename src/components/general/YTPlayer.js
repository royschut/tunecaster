import React from "react";
import YouTube from "react-youtube";
import Vars from "../../data/Vars";

//const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
//const BUFFERING = 3;
const CUED = 5;

/*
const EVSTR = {
  // ["-1"]: "unstarted",
  0: "ended",
  1: "playing",
  2: "paused",
  3: "buffering",
  5: "cued"
};*/

export default class YTPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.player = null;
    this.newVid = false;
  }
  componentDidUpdate(prev) {
    let p = this.props;

    if (p.ytid !== prev.ytid) this.newVid = true;

    if (this.player) {
      if (p.doPlay !== prev.doPlay) {
        if (p.doPlay && this.getState() !== PLAYING) this.player.playVideo();
        if (!p.doPlay && this.getState() === PLAYING) this.player.pauseVideo();
      }
      if (p.mute !== prev.mute) {
        if (p.mute) this.player.mute();
        else this.player.unMute();
      }
    }
  }
  onStateChange(event) {
    if (!this.player) this.player = event.target;

    let ev = event.data;
    let p = this.props;

    if (this.newVid) {
      if (ev === CUED) {
        this.player.mute();
        this.player.playVideo();
      }
      if (ev === PLAYING) {
        this.player.unMute();
        this.player.pauseVideo();
      }
      if (ev === PAUSED) {
        this.newVid = false; //Reset here, otherwise looks like userPause
        this.props.onBuffered(this.player.getDuration());
      }
    } else {
      if (ev === PAUSED && p.doPlay) this.props.onUserPause(true);
      if (ev === PLAYING && !p.doPlay) this.props.onUserPause(false);
      if (ev === ENDED) this.props.onEnded();
    }
  }
  getState() {
    return this.player ? this.player.getPlayerState() : 0;
  }
  render() {
    const opts = { ...Vars.YTOpts };
    let className = "yt";
    if (!this.props.visible) className += " invisible";

    return (
      <div className={className}>
        <YouTube
          videoId={String(this.props.ytid)}
          opts={opts}
          onStateChange={e => this.onStateChange(e)}
        />
      </div>
    );
  }
}
