import React from "react";
import GlyphButton from "components/glyph-button";
import { Col, Row, Modal } from "react-bootstrap";
import Location from "components/location";
import PlayerModal from "components/player-modal";

export default class PlayerWidget extends React.Component {

  constructor(props) {
    super(props);
    this.openModal = () => {this.setState({showModal: true});};
    this.closeModal = () => {this.setState({showModal: false});};
    this.state = { showModal: false };
  }

  render() {
    const {hero} = this.props;
    const title = hero ? "Helden" : "Gegner";
    const add_tt = "Einen " + title + " hinzufügen";
    const location_id = hero ? 0 : 1;

    return (
      <Col lg={6} md={6} sm={12}>
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.openModal}>
          <h2>{title}</h2>
        </GlyphButton>
        <Row>
          <Location
            players={this.props.players}
            id={location_id}
            onPlayerRemove={this.props.onRemove}
            onPlayerMove={this.props.onMove}
            onPlayerEdit={this.props.onEdit}
            onGearEdit={this.props.onGearEdit}
            />
        </Row>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal} >
          <PlayerModal hero={hero} onAdd={this.props.onAdd} onClose={this.closeModal}/>
        </Modal>
      </Col>
    );
  }
}

PlayerWidget.defaultProps = {
  hero: false
};
