import React from "react";
import GlyphButton from "components/glyph-button";
import { Modal, Col, Row } from "react-bootstrap";
import LocationModal from "components/location-modal";

export default class LocationWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };

    this.openModal = () => {this.setState({showModal: true});};
    this.closeModal = () => {this.setState({showModal: false});};
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
      <Col sm={12} className="location-widget">
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.openModal}>
          <h2>{title}</h2>
        </GlyphButton>
        <Row>
          {locations}
        </Row>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal} >
          <LocationModal onAdd={this.props.onAdd} onClose={this.closeModal}/>
        </Modal>
      </Col>
    );
  }
}
