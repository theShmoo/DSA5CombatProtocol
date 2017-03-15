import React from "react";
import GlyphButton from "components/glyph-button";
import { Col, Row } from "react-bootstrap";

export default class LocationWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
  }

  addLocation() {
    var location = {};
    this.props.onAdd(location);
  }

  render() {
    const title = "Orte";
    const add_tt = "Einen Ort hinzufügen";
    let locations = this.props.locations.map((l, id) => {return (
      <Col lg={4} md={6} sm={12} key={id}>
        {l}
      </Col>
    );});
    return (
      <Col lg={12} md={12} sm={12}>
        <Row>
          <span><h3>{title}</h3></span>
          <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.addLocation} />
        </Row>
        <Row>
          {locations}
        </Row>
      </Col>
    );
  }
}
