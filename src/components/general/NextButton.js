import React from "react";

export default class NextButton extends React.Component {
  render() {
    let className = "nexttrack";
    //className += this.props.mixFlash ? " nexttrack_flash" : "";
    return (
      <button className={className} onClick={() => this.props.onNext()}>
        <img src="./image/playnext_icon.png" alt="Play next" />
      </button>
    );
  }
}
