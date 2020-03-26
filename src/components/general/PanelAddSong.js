import React from "react";
import YouTube from "react-youtube";
import Parser from "html-react-parser";

import Vars from "../../data/Vars";
import { Timer } from "../../tools/Tools";
import YTSearcher from "../../tools/YTSearcher";
import TextInput from "./TextInput";

const initValue = "Search";

export default class PanelAddSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: initValue,
      searching: false,
      ytid: null,
      title: "",
      videos: [],
      castStatus: null
    };
    this.searcher = new YTSearcher();
  }
  onChange(term) {
    if (this.searchTimer) this.searchTimer.pause();
    this.setState({ term: term, castStatus: null });
    this.searchTimer = new Timer(() => this.doSearch(), Vars.searchDelay);
  }
  doSearch() {
    this.setState({ searching: true });
    this.searcher.search(this.state.term, result => {
      this.setState({ searching: false });
      if (result.length) {
        this.setState({ videos: result });
      }
    });
  }
  formatTitle(str) {
    let max = 50;
    if (str.length > max) str = str.substring(0, max - 3) + "...";
    return str;
  }
  onCastNow() {
    this.props.onCastNow(this.state.ytid, this.state.title);
    this.setState({
      ytid: "",
      castStatus: "Song has been cast! &#x25B2;"
    });
  }
  render() {
    let castClass = "casterdiv";
    if (!this.state.ytid) castClass += " invisible";
    return (
      <React.Fragment>
        <h3>Add songs</h3>
        <div className="addsong">
          {this.state.ytid && (
            <YouTube videoId={this.state.ytid} opts={Vars.YTSearchPlayerOpts} />
          )}
          {this.state.castStatus !== null && !this.state.ytid && (
            <p>{Parser(this.state.castStatus)}</p>
          )}
          {this.state.searching && <span>Searching...</span>}
          <div className="YTSearchList">
            {this.state.videos.map((item, key) => (
              <div
                key={key}
                className="YTSearchItem"
                onClick={() =>
                  this.setState({ ytid: item.ytid, title: item.title })
                }
              >
                <span>{this.formatTitle(item.title)}</span>
              </div>
            ))}
          </div>
          <div className="ytsearchbar">
            <TextInput
              onChange={val => this.onChange(val)}
              value={this.state.term}
            />
            {this.state.videos.length > 0 && (
              <button
                onClick={() => this.setState({ videos: [], term: initValue })}
              >
                x
              </button>
            )}
          </div>
          <div className={castClass}>
            <img
              src="./image/caster.png"
              alt="Cast now!"
              className="caster"
              onClick={() => this.onCastNow()}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
