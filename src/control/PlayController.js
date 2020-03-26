import React from "react";

import { Timer } from "../tools/Tools";
import { actions } from "../vo/PlayActionVO";
import SongVO from "../vo/SongVO";

export default class PlayController extends React.Component {
  constructor(props) {
    super(props);
    this.active = 0;
    this.hasStarted = false;

    //Song are stored, only to check if still playable (after filtering or new casts)
    this.song0 = null;
    this.song1 = null;
  }
  componentDidUpdate(prev) {
    let p = this.props;
    let vo = this.props.playlistVO;
    let actVO = this.props.playActionVO;

    if (vo.prelist.length && !this.hasStarted) this.startLoading();
    if (p.mayStart && !prev.mayStart) this.switchTo(0);

    if (p.userPause !== prev.userPause) this.onUserPause();
    if (p.runtime !== prev.runtime)
      this.onRuntimeChanged(p.runtime - prev.runtime);
    if (actVO.action) this.doAction(actVO.action);

    if (this.song0 && this.song1) this.checkStillPlayable();
  }
  startLoading() {
    this.hasStarted = true;
    this.loadNext(0);
  }
  loadNext(player) {
    let song = this.props.playlistVO.nextSong();
    this["song" + player] = song;
    if (song) this.props.setYtid(player, song.ytid);
    else this.props.onAllFinished();

    //Send active songs up

    let active = player ? 0 : 1;
    let otherSongVO = new SongVO(
      this["song" + player].ytid,
      this["song" + player].title
    );

    let activeSongVO = this["song" + active]
      ? new SongVO(this["song" + active].ytid, this["song" + active].title)
      : new SongVO();

    this.props.setActiveSongs(activeSongVO, otherSongVO);
  }
  fadeIn(player) {
    this.fading = true;
    this.props.setDoPlay(player, true);
    this.timer = new Timer(() => this.switchTo(player), this.props.fadetime);
  }
  switchTo(player) {
    this.active = player;
    this.fading = false;
    let other = player ? 0 : 1;

    //Control players
    this.props.setVisible(player, true);
    this.props.setDoPlay(player, true);

    this.props.setDoPlay(other, false);
    this.props.setVisible(other, false);

    this.loadNext(other);

    //Run timers
    let time = this.props.runtime - this.props.fadetime;
    //todo: when 0, dont put timer, but wait for finished (or fadetime before)
    this.timer = new Timer(() => this.fadeIn(other), time);
  }
  checkStillPlayable() {
    let song, shouldMixOther, shouldMixThis;
    let other = this.active ? 0 : 1;
    let plVO = this.props.playlistVO;

    if (this.fading) return;

    //Check other vid
    song = this["song" + other];
    if (song.prelistid) {
      if (plVO.getPlayableList("userlist").length) shouldMixOther = true;
      else if (!plVO.checkType(song.prelistid)) shouldMixOther = true;
    }

    if (shouldMixOther) this.loadNext(other);
    else {
      //Check currently playing, only switch if other is already playable
      song = this["song" + this.active];
      if (song.prelistid) {
        if (!plVO.checkType(song.prelistid)) shouldMixThis = true;
      }

      if (shouldMixThis) this.switchTo(other);
    }
  }
  doAction(action) {
    if (action === actions.NEXT && !this.fading) {
      this.timer.pause();
      this.fadeIn(this.active ? 0 : 1);
    } else if (action === actions.MUTE) {
      this.props.onMute();
      this.props.onActionDone();
    }
    this.props.onActionDone();
  }
  onRuntimeChanged(diff) {
    if (this.timer && !this.fading) {
      this.timer.pause();
      this.timer.setRemaining(this.timer.getRemaining() + diff);
      this.timer.resume();
    }
  }
  onUserPause() {
    let other = this.player ? 0 : 1;

    if (this.props.userPause) {
      if (this.timer) this.timer.pause();
      this.props.setDoPlay(this.active, false);
      this.props.setDoPlay(other, false);
    } else {
      this.props.setDoPlay(this.active, true);
      if (this.fading) this.props.setDoPlay(other, true);
      if (this.timer) this.timer.resume();
    }
  }
  render() {
    return "";
  }
}
