import React from "react";

export default class BarHost extends React.Component {
  render() {
    return (
      <div className="logo">
        <span className="logoTune">TUNE</span>
        <span className="logoCaster">CASTER</span>
        <img
          src="./image/caster.png"
          alt="Cast now!"
          className="logoImg"
          onClick={() => this.onCastNow()}
        />
      </div>
    );
  }
}
