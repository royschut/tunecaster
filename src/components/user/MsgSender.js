import React from "react";

const initVal1 = "Message";
const initVal2 = "Your name";

export default class MsgSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: initVal1,
      user: initVal2
    };
  }
  checkClear1() {
    if (this.state.msg === initVal1) this.setState({ msg: "" });
  }

  checkClear2() {
    if (this.state.user === initVal2) this.setState({ user: "" });
  }
  render() {
    return (
      <div className="msgSender">
        <h4>Send a message to host:</h4>
        {!this.props.msgStatus && (
          <React.Fragment>
            <input
              type="text"
              value={this.state.msg}
              onClick={() => this.checkClear1()}
              onChange={e => this.setState({ msg: e.target.value })}
            />
            <input
              type="text"
              value={this.state.user}
              onClick={() => this.checkClear2()}
              onChange={e => this.setState({ user: e.target.value })}
            />
            <button
              onClick={() =>
                this.props.onSendMsg(this.state.msg, this.state.user)
              }
            >
              Send
            </button>
          </React.Fragment>
        )}
        {this.props.msgStatus !== "" && this.props.msgStatus}
      </div>
    );
  }
}
