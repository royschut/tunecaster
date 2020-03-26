import React from "react";

export default class PanelHeader extends React.Component {
  render() {
    let icons = this.props.icons;
    let titles = this.props.titles;
    let visibles = this.props.visibles;
    let notifications = this.props.notifications;

    let panelclass = "panelHeader";
    if (!this.props.opened) panelclass += " panelHeaderClosed";

    return (
      <div className={panelclass}>
        {this.props.icons.map(
          (icon, i) =>
            visibles[i] && (
              <div
                key={i}
                className={
                  this.props.selectedPanel === i && this.props.opened
                    ? "panelHeaderItem panelHeaderItemActive"
                    : "panelHeaderItem"
                }
                onClick={() => this.props.onSwitch(i)}
              >
                <img
                  src={"./image/" + icons[i] + ".png"}
                  alt={titles[i]}
                  className="panelIcon"
                />
                {notifications[i] > -1 && (
                  <button className="panelNotification">
                    {notifications[i]}
                  </button>
                )}
              </div>
            )
        )}
        <div className="spacer"></div>
        {this.props.opened && (
          <button
            onClick={() => this.props.onClose()}
            className="panelHeaderClose"
          >
            x
          </button>
        )}
      </div>
    );
  }
}
