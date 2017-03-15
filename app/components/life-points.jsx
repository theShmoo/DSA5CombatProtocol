import React from "react";
import PlayerProperty from "components/player-property";

export default class LifePoints extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PlayerProperty title="Lep">
        {this.props.max}
      </PlayerProperty>
    );
  }
}
