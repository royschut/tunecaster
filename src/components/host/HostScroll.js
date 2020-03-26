import React from "react";
import Parser from "html-react-parser";
import Vars from "../../data/Vars";

export default class HostScroll extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  hostText() {
    return (
      "<span class='hostscrollTitle'>Party hosted by <b>" +
      this.props.hostVO.name +
      "</b></span>"
    );
  }
  codeText() {
    return "<i>" + Vars.siteURL + this.props.hostVO.code + "</i>";
  }
  renderMsgs() {
    return this.props.messages
      .map(item => "<b>" + item.user + "</b>: " + item.msg)
      .join(" - ");
  }
  messages() {
    if (!this.props.messages.length) return "";
    else return " <b>PARTY MESSAGES:</b> <i>" + this.renderMsgs() + "</i> ";
  }
  render() {
    let bull = " &bull; &bull; &bull; ";
    let text =
      bull +
      this.hostText() +
      bull +
      this.codeText() +
      bull +
      this.messages() +
      bull +
      "&nbsp;".repeat(16);
    text = text.repeat(4);
    return (
      <div className="hostscroll">
        <div>{Parser(text)}</div>
      </div>
    );
  }
}
