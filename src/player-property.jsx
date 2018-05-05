import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";

export default class Armor extends Component {

  render() {
    return (
      <ListGroupItem header={this.props.title}>
        {this.props.children}
      </ListGroupItem>
    );
  }
}
