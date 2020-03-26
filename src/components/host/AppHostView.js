import React from "react";

import PanelAddSong from "../general/PanelAddSong";
import EditPrelist from "./EditPrelist";
import MusicPlayer from "./MusicPlayer";
import PlaylistView from "./PlaylistView";
import PlayerControlsView from "./PlayerControlsView";
import HostCode from "./HostCode";
import CreateHost from "./CreateHost";
import Logo from "../general/Logo";
import HostScroll from "./HostScroll";
import Divider from "../general/Divider";
import Panel from "../general/Panel/Panel";
import CurrentSongsView from "./CurrentSongsView";

export default class AppHostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedPanel: 0, panelOpened: true };
  }
  componentDidUpdate(prev) {
    if (this.props.hostVO.id && !prev.hostVO.id)
      this.setState({ selectedPanel: 1, panelOpened: true });
  }
  fullscreen() {
    let view = document.documentElement;
    var requestFullScreen =
      view.requestFullScreen ||
      view.mozRequestFullScreen ||
      view.webkitRequestFullScreen ||
      view.msRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(view)();
    }
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <HostCode hostcode={this.props.hostVO.code} />
        </header>
        <div className="MusicPlayers">
          <MusicPlayer
            playlistVO={this.props.playlistVO}
            mixstyleVO={this.props.mixstyleVO}
            playActionVO={this.props.playActionVO}
            onActionDone={() => this.props.onActionDone()}
            onAllFinished={() => this.props.onAllFinished()}
            onVidEnded={() => this.props.onNext()}
            setActiveSongs={(s1, s2) => this.props.setActiveSongs(s1, s2)}
          />
        </div>
        <div className="Overlays">
          <Panel
            icons={["host_icon", "playlist_icon", "radio_icon"]}
            titles={["Host", "Playlist", "Radio"]}
            visibles={[
              this.props.hostVO.id < 1,
              this.props.hostVO.id > 0,
              true
            ]}
            opened={this.state.panelOpened}
            selectedPanel={this.state.selectedPanel}
            onSwitch={p =>
              this.setState({ selectedPanel: p, panelOpened: true })
            }
            onClose={() => this.setState({ panelOpened: false })}
            notifications={[
              -1,
              this.props.playlistVO.getPlayableList("userlist").length,
              -1
            ]}
          >
            <CreateHost onCreateHost={name => this.props.onCreateHost(name)} />
            <React.Fragment>
              <PlaylistView
                title="Your playlist"
                playlist={this.props.playlistVO.getPlayableList("userlist")}
                bottombarClass="playlistBottomUser"
                onMoveSong={(fromId, toId) =>
                  this.props.onMoveSong("userlist", fromId, toId)
                }
                onRemoveSong={id => this.props.onRemoveSong("userlist", id)}
                onShuffle={() => this.props.onShuffle("userlist")}
              />
              <Divider />
              <PanelAddSong
                onCastNow={(ytid, title) => this.props.onCastNow(ytid, title)}
              />
            </React.Fragment>
            <React.Fragment>
              <EditPrelist
                playlistVO={this.props.playlistVO}
                onToggleType={i => this.props.onToggleType(i)}
              />
              <PlaylistView
                title="Radio playlist"
                playlist={this.props.playlistVO.getPlayableList("prelist")}
                bottombarClass="playlistBottomPre"
                onMoveSong={(fromId, toId) =>
                  this.props.onMoveSong("prelist", fromId, toId)
                }
                onRemoveSong={id => this.props.onRemoveSong("prelist", id)}
                onShuffle={() => this.props.onShuffle("prelist")}
              />
            </React.Fragment>
          </Panel>
        </div>
        <div className="smallMenu">
          <img
            className="fullscreen"
            src="./image/fullscreen_icon.png"
            alt="Full screen"
            title="Full screen"
            onClick={() => this.fullscreen()}
          />
        </div>
        {this.props.hostVO.name && (
          <HostScroll
            hostVO={this.props.hostVO}
            messages={this.props.messagesVO.getMessages()}
          />
        )}
        <footer>
          <Logo />
          <CurrentSongsView
            activeSong={this.props.activeSong}
            otherSong={this.props.otherSong}
          />
          <PlayerControlsView
            mixstyleVO={this.props.mixstyleVO}
            onNext={() => this.props.onNext()}
            onMute={() => this.props.onMute()}
            onMixstyleChange={val => this.props.onMixstyleChange(val)}
          />
        </footer>
      </React.Fragment>
    );
  }
}
