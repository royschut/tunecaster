import React from "react";

export default class EditPrelist extends React.Component {
  render() {
    return (
      <div className="EditPrelist">
        <h3>Radio</h3>
        {this.props.playlistVO.types.map((item, key) => (
          <label key={key} className="pointer">
            <input
              type="checkbox"
              checked={item.active}
              onChange={() => this.props.onToggleType(key)}
            />
            <span className="unselectable"> {item.name}</span>
            <br />
          </label>
        ))}
      </div>
    );
  }
}
