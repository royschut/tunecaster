import React from "react";

import Vars from "../../data/Vars";

export default class HostCode extends React.Component {
  render() {
    return (
      <div className="hostcode">
        {this.props.hostcode && <h3>{Vars.siteURL + this.props.hostcode}</h3>}
      </div>
    );
  }
}
