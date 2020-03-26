import React from "react";

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.initValue = props.value;
    this.state = {
      value: props.value
    };
  }
  componentDidUpdate(prev) {
    if (this.props.value !== prev.value) {
      this.setState({ value: this.props.value });
    }
  }
  onChange(value) {
    if (value !== this.initValue) {
      this.props.onChange(value);
    }
  }
  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onFocus={e => {
          if (e.target.value === this.initValue) this.setState({ value: "" });
        }}
        onBlur={e => {
          if (e.target.value === "") this.setState({ value: this.initValue });
        }}
        onChange={e => this.onChange(e.target.value)}
        onKeyDown={e => {
          if (this.props.onKeyDown) this.props.onKeyDown(e);
        }}
      />
    );
  }
}
