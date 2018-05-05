import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import NumericControl from "./numeric-control";
import {getIniBoni} from "./bonusCalculations";
import HeadedTogglePanel from "./HeadedTogglePanel";

const HEADER = (
  "Initiative"
);

export default class IniWidget extends Component {

  constructor(props) {
    super(props);
    this.iniChange = (id, name, value) => {this.props.onEdit(id, name, value);};
  }

  createPlayer({id, ini, name, hero, states}) {
    const title = (
      <span className= {hero ? "ini-hero" : "ini-enemy"} >
        {name}
      </span>
    );
    const ini_tt = "Initiative von " + name;

    return (
        <NumericControl
          key={id}
          title={title}
          states={getIniBoni(states)}
          value={ini}
          tooltip={ini_tt}
          name="ini"
          id={id}
          onChange={this.iniChange} />
    );
  }

  render() {
    const { players } = this.props;

    if(players.length > 0)
    {

      let sorted_players = players.sort(
        (a, b) => {
          const a_val = a.ini.start + (a.ini.current ? a.ini.current : 0);
          const b_val = b.ini.start + (b.ini.current ? b.ini.current : 0);
          return b_val - a_val;
        }
      ).map((p) => this.createPlayer(p));

      return (
        <Col sm={12} className="ini-widget">
          <HeadedTogglePanel expanded={true} header={HEADER}>
            <ListGroup>
              {sorted_players}
            </ListGroup>
          </HeadedTogglePanel>
        </Col>
      );
    }
    else return (<span />);
  }
}
