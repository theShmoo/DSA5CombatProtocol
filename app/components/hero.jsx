import React from "react";
import {ListGroupItem} from "react-bootstrap";
import Player from "components/player";

export default class Hero extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Player name={this.props.name} onRemove={this.props.onRemove}>
        {this.props.children}
      </Player>
    );
  }
};
