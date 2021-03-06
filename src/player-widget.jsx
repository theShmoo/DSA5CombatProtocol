import React, { Component } from "react";
import { Col, Row, Modal } from "react-bootstrap";
import GlyphButton from "./glyph-button";
import Location from "./location";
import PlayerModal from "./player-modal";
import {defaultHero, defaultEnemy} from "./default-player";

export default class PlayerWidget extends Component {

  constructor(props) {
    super(props);
    this.openModal = () => {this.setState({showModal: true});};
    this.closeModal = () => {this.setState({showModal: false});};
    this.state = { showModal: false };
  }

  render() {
    const {hero, players, onRemove, onDuplicate, onMove, onEdit, onEditProperty, onGearEdit, onAdd} = this.props;
    const title = hero ? "Helden" : "Gegner";
    const add_tt = "Einen " + title + " hinzufügen";
    const location_id = hero ? 0 : 1;

    let location = {id: location_id, name: title, cramped: false, darkness: 0};

    return (
      <Col lg={6} md={6} sm={12} className="player-widget">
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.openModal}>
          <h2>{title}</h2>
        </GlyphButton>
        <Row>
          <Location
            players={players}
            id={location_id}
            location={location}
            onPlayerRemove={onRemove}
            onPlayerMove={onMove}
            onPlayerDuplicate={onDuplicate}
            onPlayerEdit={onEdit}
            onPlayerEditProperty={onEditProperty}
            onGearEdit={onGearEdit}
            />
        </Row>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal} >
          <PlayerModal isEdit={false} player={hero ? defaultHero : defaultEnemy} onSubmit={onAdd} onClose={this.closeModal}/>
        </Modal>
      </Col>
    );
  }
}

PlayerWidget.defaultProps = {
  hero: false
};
