import React from "react";

import NextButton from "../general/NextButton";

export default class PlayerControlsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { muted: false };
  }
  render() {
    let muteIcon = this.state.muted ? "mute_" : "";
    return (
      <div className="PlayControls">
        <NextButton onNext={() => this.props.onNext()} />
        <button
          className="nexttrack"
          onClick={() => {
            this.props.onMute();
            this.setState({ muted: !this.state.muted });
          }}
        >
          <img
            src={"./image/speaker_" + muteIcon + "icon.png"}
            alt="Play next"
          />
        </button>
        <div className="EditMixstyle">
          {/* <input
            type="range"
            min="2"
            max={this.props.mixstyleVO.mixstyles.length}
            value={this.props.mixstyleVO.curMixstyle}
            className="mixstyleSlider"
            onChange={e => this.props.onMixstyleChange(e.target.value)}
          /> */}
          {/* <br />
          <span className="unselectable">
            {this.props.mixstyleVO.getName()}
          </span> */}
        </div>
      </div>
    );
  }
}
