import React from "react";

export default class NumericControl extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>
          <dt>{this.props.title}</dt>
          <dd>
             {this.props.value}
          </dd>
        </span>
    );
  }
}
