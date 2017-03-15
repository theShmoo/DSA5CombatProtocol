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
        <li>
          <strong>{this.props.name}</strong>
          <ul className="list-inline">
             <NumericControl title="AT" value={this.props.at} />
             <NumericControl title="PA" value={this.props.pa} />
             <PlayerProperty title="RW">
              {this.props.rw}
             </PlayerProperty>
          </ul>
        </li>
    );
  }
}
