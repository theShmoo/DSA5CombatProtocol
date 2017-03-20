import React from "react";
import NumericControl from "components/numeric-control";
import { Col, ListGroup, ListGroupItem, Badge, Panel } from "react-bootstrap";

const HEADER = (
  "Initiative"
);

export default class IniWidget extends React.Component {

  constructor(props) {
    super(props);
    this.iniChange = (id, name, value) => {this.props.onEdit(id, name, value);};
  }

  createPlayer({id, ini, name, hero}) {
    const title = (
      <h4 className= {hero ? "ini-hero" : "ini-enemy"} >
        {name}
      </h4>
    );
    return (
        <NumericControl
          key={id}
          title={title}
          value={ini}
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
          <Panel collapsible defaultExpanded={true} header={HEADER}>
            <ListGroup fill>
              {sorted_players}
            </ListGroup>
          </Panel>
        </Col>
      );
    }
    else return (<span />);
  }
}
