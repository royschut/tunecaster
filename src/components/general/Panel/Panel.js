import React from "react";

import PanelHeader from "./PanelHeader";

/**
 *
 * Nice Panel to reuse
 */

export default class Panel extends React.Component {
  controlVisible(item, i) {
    if (i === this.props.selectedPanel) return item;
    //todo:add nice animation here
  }
  render() {
    let visibleClass = this.props.opened ? "" : "invisible";

    return (
      <div className="panel">
        <PanelHeader
          headerTitleHtml={this.props.headerTitleHtml}
          icons={this.props.icons}
          titles={this.props.titles}
          notifications={this.props.notifications}
          visibles={this.props.visibles}
          opened={this.props.opened}
          selectedPanel={this.props.selectedPanel}
          onSwitch={i => this.props.onSwitch(i)}
          onClose={() => this.props.onClose()}
        />
        <div className={"Panel_content " + visibleClass}>
          <div className="panelContent">
            {this.props.children.map((item, i) => this.controlVisible(item, i))}
          </div>
        </div>
      </div>
    );
  }
}
