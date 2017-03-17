import React from "react";
import { ListGroupItem } from "react-bootstrap";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroupItem header={this.props.title}>
        {this.props.children}
      </ListGroupItem>
    );
  }
}
