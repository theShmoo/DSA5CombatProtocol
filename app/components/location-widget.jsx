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

  renderLocations(locations){

    if(locations.length > 0) {
      let locs = locations.map((l, id) => {return (
        <Col lg={4} md={6} sm={12} key={id}>
          {l}
        </Col>
      );});

      return (<Row>{locs}</Row>);
    }
    else {
      return (<span />);
    }
  }

  render() {
    const title = "Orte";
    const add_tt = "Einen Ort hinzufügen";
    return (
      <Col sm={12} className="location-widget">
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.openModal}>
          <h2>{title}</h2>
        </GlyphButton>
        {this.renderLocations(this.props.locations)}
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal} >
          <LocationModal onSubmit={this.props.onAdd} onClose={this.closeModal} />
        </Modal>
      </Col>
    );
  }
}
