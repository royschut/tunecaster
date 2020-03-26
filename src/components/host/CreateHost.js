import React from "react";
import TextInput from "../general/TextInput";

const ENTERING = 2;
const CREATING = 3;
const initValue = "Your name..";

export default class CreateHost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ENTERING,
      name: initValue,
      warning: ""
    };
  }
  onChange(val) {
    this.setState({ name: val, warning: "" });
  }
  onCreateHost() {
    if (this.state.status === ENTERING) {
      if (this.state.name.length > 90) {
        this.setState({ warning: "90 characters maximum" });
      } else {
        this.props.onCreateHost(this.state.name);
        this.setState({ status: CREATING });
      }
    }
  }
  render() {
    return (
      <div className="createHost">
        {this.state.status === ENTERING && (
          <React.Fragment>
            <h3>Host a party:</h3>
            <TextInput
              onChange={val => this.onChange(val)}
              value={this.state.name}
              onKeyDown={e => {
                if (e.keyCode === 13) this.onCreateHost();
              }}
            />
            <button onClick={() => this.onCreateHost()}>Host now!</button>
            <br />
            <span className="warning">{this.state.warning}</span> <br /> <br />
          </React.Fragment>
        )}
        {this.state.status === CREATING && <span>Loading..</span>}
      </div>
    );
  }
}
