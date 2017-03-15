import React from "react";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>
          <dt>{this.props.title}</dt>
          <dd>
             {this.props.children}
          </dd>
        </span>
    );
  }
}
