import React from "react";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li>
          <strong>{this.props.title}</strong> {this.props.children}
        </li>
    );
  }
}
