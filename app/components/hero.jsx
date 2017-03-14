import React from "react";
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";

export default class Hero extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel header={this.props.name}>
        <ListGroup fill>
          <ListGroupItem header="Lep:">
            {this.props.lep}
          </ListGroupItem>
          <ListGroupItem header="At:">
            {this.props.at}
          </ListGroupItem>
          <ListGroupItem header="Pa:">
            {this.props.pa}
          </ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}
