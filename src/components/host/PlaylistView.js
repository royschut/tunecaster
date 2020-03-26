import React from "react";

export default class PlaylistView extends React.Component {
  drag(event) {
    event.dataTransfer.setData("id", event.target.id);
  }
  dragOver(event) {
    event.preventDefault();
    let t = event.target;
    if (t.tagName === "P") t = t.parentElement;
    if (t.tagName === "DIV") {
      t.style.borderColor = "rgba(255, 178, 0, 1)";
    }
  }
  dragLeave(event) {
    let t = event.target;
    if (t.tagName === "P") t = t.parentElement;
    if (t.tagName === "DIV") t.style.borderColor = "rgba(255, 178, 0, 0)";
  }
  drop(event) {
    event.preventDefault();
    let t = event.target;

    if (t.tagName === "P") t = t.parentElement;
    if (t.tagName === "DIV") t.style.borderColor = "rgba(255, 178, 0, 0)";
    let dragId = event.dataTransfer.getData("id");
    let dropId = event.target.id;

    if (dragId && dropId) this.props.onMoveSong(dragId, dropId);
  }
  moveSongUp(i) {
    this.props.onMoveSong(
      this.props.playlist[i].id,
      this.props.playlist[i - 1].id
    );
  }
  moveSongDown(i) {
    this.props.onMoveSong(
      this.props.playlist[i].id,
      this.props.playlist[i + 1].id
    );
  }
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="playlistscroll">
          {this.props.playlist.map((item, i) => (
            <div
              className="playlist_item"
              key={i}
              id={item.id}
              draggable="true"
              onDragStart={e => this.drag(e)}
              onDrop={e => this.drop(e)}
              onDragOver={e => this.dragOver(e)}
              onDragLeave={e => this.dragLeave(e)}
            >
              <p id={item.id} style={{ cursor: "inherit" }}>
                {item.title}
              </p>
              <div className="playlist_buttons">
                <div className="playlist_arrows">
                  {i > 0 && (
                    <button onClick={() => this.moveSongUp(i)}>&#8593;</button>
                  )}
                  {i < this.props.playlist.length - 1 && (
                    <button onClick={() => this.moveSongDown(i)}>
                      &#8595;
                    </button>
                  )}
                </div>
                <button onClick={() => this.props.onRemoveSong(item.id)}>
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={"playlistBottombar " + this.props.bottombarClass}>
          <p>{this.props.playlist.length} songs in playlist</p>
          <img
            src="./image/shuffle.png"
            className="shuffleimg"
            alt="Shuffle playlist"
            title="Shuffle playlist"
            onClick={() => this.props.onShuffle()}
          />
        </div>
      </div>
    );
  }
}
