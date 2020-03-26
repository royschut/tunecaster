import React from "react";

import DataSource from "../../data/DataSource";
import AppHostView from "./AppHostView";
import HostVO from "../../vo/HostVO";
import PlaylistVO from "../../vo/PlaylistVO";
import MixstyleVO from "../../vo/MixstyleVO";
import { actions, PlayActionVO } from "../../vo/PlayActionVO";
import { RecurringTimer } from "../../tools/Tools";
import MessagesVO from "../../vo/MessagesVO";
import SongVO from "../../vo/SongVO";

export default class AppHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostVO: new HostVO(),
      playlistVO: new PlaylistVO(),
      mixstyleVO: new MixstyleVO(),
      playActionVO: new PlayActionVO(),
      messagesVO: new MessagesVO(),

      activeSong: new SongVO(),
      otherSong: new SongVO()
    };
    this.dataSource = new DataSource();
  }
  componentDidMount() {
    this.getPrelists();
    if (this.props.match.params.id)
      this.loadHost(this.props.match.params.id.substring(1));
  }
  getPrelists() {
    this.dataSource.getprelists(result => {
      this.setState({
        playlistVO: this.state.playlistVO.setPrelist(result)
      });
    });
  }
  createHost(name) {
    this.dataSource.createHost(name, result => {
      this.setState(
        { hostVO: new HostVO(result.id, name, result.hostcode) },
        () => this.runHost(true)
      );
    });
  }
  loadHost(code) {
    this.dataSource.loadHost(code, result => {
      if (result.data) {
        this.dataSource.resetRetrieved(result.data.id);
        this.setState(
          { hostVO: new HostVO(result.data.id, result.data.hostname, code) },
          () => this.runHost(false)
        );
      }
    });
  }
  runHost(newHost) {
    if (newHost) this.props.history.push("host=" + this.state.hostVO.code);
    this.int = new RecurringTimer(() => this.getUserlistUpdate(), 2000);
    this.int2 = new RecurringTimer(() => this.getMessages(), 5000);
  }
  getUserlistUpdate() {
    this.dataSource.getNewSongs(this.state.hostVO.id, result => {
      this.setState({
        playlistVO: this.state.playlistVO.addUserlist(result)
      });
    });
  }
  getMessages() {
    this.dataSource.getMessages(this.state.hostVO.id, result => {
      this.setState({
        messagesVO: this.state.messagesVO.addMessages(result)
      });
    });
  }
  onAllFinished() {
    console.log("PLAYLIST FINISHED!!"); //todo: reload prelist?
  }
  render() {
    const hostVO = this.state.hostVO;
    const playlistVO = this.state.playlistVO;
    const mixstyleVO = this.state.mixstyleVO;
    const actVO = this.state.playActionVO;
    const messagesVO = this.state.messagesVO;
    const dc = this.dataSource;
    const MUTE = actions.MUTE;
    const NEXT = actions.NEXT;
    return (
      <AppHostView
        hostVO={hostVO}
        playlistVO={playlistVO}
        mixstyleVO={mixstyleVO}
        playActionVO={actVO}
        messagesVO={messagesVO}
        activeSong={this.state.activeSong}
        otherSong={this.state.otherSong}
        onCreateHost={name => this.createHost(name)}
        onCastNow={(ytid, title) => dc.addSong(hostVO.id, ytid, title)}
        setActiveSongs={(s1, s2) =>
          this.setState({ activeSong: s1, otherSong: s2 })
        }
        onNext={() => this.setState({ playActionVO: actVO.setAction(NEXT) })}
        onMute={() => this.setState({ playActionVO: actVO.setAction(MUTE) })}
        onActionDone={() => this.setState({ playActionVO: actVO.actionDone() })}
        onToggleType={i =>
          this.setState({ playlistVO: playlistVO.toggleType(i) })
        }
        onMoveSong={(listName, fromId, toId) =>
          this.setState({
            playlistVO: playlistVO.moveSong(listName, fromId, toId)
          })
        }
        onRemoveSong={(listName, id) =>
          this.setState({ playlistVO: playlistVO.removeSong(listName, id) })
        }
        onShuffle={listName =>
          this.setState({ playlistVO: playlistVO.shuffle(listName) })
        }
        onMixstyleChange={val =>
          this.setState({ mixstyleVO: mixstyleVO.setCurMixstyle(val) })
        }
        onAllFinished={() => this.onAllFinished()}
      />
    );
  }
}
