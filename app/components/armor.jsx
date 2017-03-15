import React from "react";
import PlayerProperty from "components/player-property";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PlayerProperty title={this.props.name}>
        {this.props.rs}
      </PlayerProperty>
    );
  }
}
