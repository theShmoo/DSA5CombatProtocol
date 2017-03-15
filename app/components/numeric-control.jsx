import React from "react";

export default class NumericControl extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li>
          <strong>{this.props.title}</strong> {this.props.value}
        </li>
    );
  }
}
