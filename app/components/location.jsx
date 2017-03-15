import React, { Component, PropTypes } from "react";
import GlyphButton from "components/glyph-button";
import Player from "components/player";
import Weapon from "components/weapon";
import Armor from "components/armor";
import LifePoints from "components/life-points";
import { ItemTypes } from "components/constants";
import { Col, Row } from "react-bootstrap";
import { DropTarget } from "react-dnd";

const locationTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    const i = props.players.findIndex(p => p.id == item.id); // find index of player
    if(i < 0)
      return false;
    return props.players[i].location != props.id && props.id > 1;
  },

  drop(props) {
    // move it
    //movePlayer(props.id);
    return{ id: props.id };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Location extends Component {

  constructor(props) {
    super(props);
    this.removeLocation = this.removeLocation.bind(this);
  }

  removeLocation() {
    this.props.onRemove(this.props.id);
  }

  createWeapon(weapon) {
    return (<Weapon name={weapon.name} key={weapon.name} at={weapon.at} pa={weapon.pa} rw={weapon.rw} />);
  }

  createArmor(armor) {
    return (<Armor name={armor.name} rs={armor.rs} be={armor.be} />);
  }

  createPlayer(player) {
    let weapons = player.weapons.map((w) => {return this.createWeapon(w);});
    let armor = this.createArmor(player.armor);
    return (
      <Player
        name={player.name}
        key={player.id}
        id={player.id}
        hero={player.hero}
        onRemove={this.props.onPlayerRemove}
        onPlayerMove={this.props.onPlayerMove}>
        <LifePoints max={player.lp.max} />
        {weapons}
        {armor}
      </Player>);
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { id, players, removeable, showtitle } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    const title = showtitle ? (<span>Ort {id-1}</span>): "";
    const remove_tt = "Entferne diesen Ort";
    const glyph = removeable ? <GlyphButton glyph="minus" tooltip={remove_tt} onClick={this.removeLocation} /> : "";

    return connectDropTarget(
       <div className="location">
        <Row className="player-title">
          {title}
          {glyph}
        </Row>
        {players.length > 0 &&
          players.filter(p => p.location == id).map((p) => {return this.createPlayer(p);})
        }
        {isOver && !canDrop && this.renderOverlay("red")}
        {!isOver && canDrop && this.renderOverlay("yellow")}
        {isOver && canDrop && this.renderOverlay("green")}
      </div>
    );
  }
}

Location.defaultProps = {
  removeable: false,
  showtitle: false
};

Location.propTypes = {
  players: React.PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.PLAYER, locationTarget, collect)(Location);
