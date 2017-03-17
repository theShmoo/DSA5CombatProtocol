import React from "react";
import GlyphButton from "components/glyph-button";
import { Col, Row, Modal } from "react-bootstrap";
import Location from "components/location";
import PlayerModal from "components/player-modal";

export default class PlayerWidget extends React.Component {

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = { showModal: false };
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    const {hero} = this.props;
    const title = hero ? "Held" : "Gegner";
    const add_tt = "Einen " + title + " hinzufügen";
    const location_id = hero ? 0 : 1;

    return (
      <Col lg={6} md={6} sm={12}>
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.openModal}>
          <h3>{title}</h3>
        </GlyphButton>
        <Row>
          <Location
            players={this.props.players}
            id={location_id}
            onPlayerRemove={this.props.onRemove}
            onPlayerMove={this.props.onMove} />
        </Row>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <PlayerModal hero={hero} onAdd={this.props.onAdd} onClose={this.closeModal}/>
        </Modal>
      </Col>
    );
  }
}

PlayerWidget.defaultProps = {
  hero: false
};
