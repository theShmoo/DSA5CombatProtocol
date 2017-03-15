import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import {ListGroup, Panel} from "react-bootstrap";

export default class Weapon extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>
          <dt>{this.props.name}</dt>
          <dd>
            <dl className="dl-inline">
              <NumericControl title="AT" value={this.props.at} />
              <NumericControl title="PA" value={this.props.pa} />
              <PlayerProperty title="RW">
              {this.props.rw}
              </PlayerProperty>
            </dl>
          </dd>

        </span>
    );
  }
}
