import React from "react";
import NumericControl from "components/numeric-control";
import { Col, ListGroup, ListGroupItem, Badge, Panel } from "react-bootstrap";

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
          const a_val = a.ini.current ? a.ini.current : a.ini.start;
          const b_val = b.ini.current ? b.ini.current : b.ini.start;
          return b_val - a_val;
        }
      ).map((p) => this.createPlayer(p));

      return (
        <Col sm={12}>
          <Panel collapsible defaultExpanded={true} header="Initiative">
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
