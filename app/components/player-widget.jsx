import React from "react";
import GlyphButton from "components/glyph-button";
import { Col, Row } from "react-bootstrap";
import Location from "components/location";

export default class PlayerWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer() {
    const location_id = this.props.hero ? 0 : 1;

    var enemy = {
      hero: this.props.hero,
      location: location_id,
      name: "Ork",
      lp: {max: 30},
      weapons: [
        {
          name: "Axt",
          at: 12,
          pa: 8,
          rw: "mittel"
        }
      ],
      armor: {
        name: "Lederrüstung",
        rs: 3,
        be: 1
      }
    };
    this.props.onAdd(enemy);
  }

  render() {
    const title = this.props.hero ? "Held" : "Gegner";
    const add_tt = "Einen " + title + " hinzufügen";
    const location_id = this.props.hero ? 0 : 1;

    return (
      <Col lg={6} md={6} sm={12}>
        <Row>
          <h3>{title}</h3>
          <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.addPlayer} />
        </Row>
        <Row>
          <Location players={this.props.players} id={location_id} onPlayerRemove={this.props.onRemove} onPlayerMove={this.props.onMove} />
        </Row>
      </Col>
    );
  }
}

PlayerWidget.defaultProps = {
  hero: false
};
