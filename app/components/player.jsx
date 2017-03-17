import React, { Component, PropTypes } from "react";
import GlyphButton from "components/glyph-button";
import Weapon from "components/weapon";
import Armor from "components/armor";
import NumericControl from "components/numeric-control";
import { ItemTypes } from "components/constants";
import { Col, Row } from "react-bootstrap";
import { DragSource } from "react-dnd";

const playerSource = {
  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    console.log("end drag player " + item.id + " on location " + dropResult.id);
    component.movePlayer(item.id, dropResult.id);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Player extends Component {

  constructor(props) {
    super(props);
    this.removePlayer = this.removePlayer.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
  }

  removePlayer() {
    this.props.onRemove(this.props.id);
  }

  movePlayer(player_id, location_id) {
    this.props.onPlayerMove(player_id, location_id);
  }

  createWeapon(weapon) {
    return (<Weapon weapon={weapon} key={weapon.name} />);
  }

  createArmor(armor) {
    return (<Armor armor={armor} key={armor.name} />);
  }


  renderProperties() {
    let weapons = this.props.player.weapons.map((w) => {return this.createWeapon(w);});
    let armors = this.props.player.armors.map((a) => {return this.createArmor(a);});

    const {lp, ini, asp} = this.props.player;

    return (
      <dl>
        <NumericControl title="Lep" value ={lp.max} />
        <NumericControl title="Ini" value ={ini.basis} />
        {asp.mage && <NumericControl title="Asp" value ={asp.max} />}
        {weapons}
        {armors}
      </dl>
    );
  }

  render() {
    const {hero, name } = this.props.player;
    const player_string = hero ? "Helden" : "Gegner";
    const remove_tt = "Entferne den " + player_string + " " + name;
    const { connectDragSource, isDragging} = this.props;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move"
      }}>
        <Col lg={6} md={6} sm={12} className="player">
          <GlyphButton glyph="minus" tooltip={remove_tt} onClick={this.removePlayer} >
              {name}
          </GlyphButton>
          { this.renderProperties() }
        </Col>
      </div>
    );
  }
}

Player.defaultProps = {
  graveyard: false,
  location_id: ""
};

Player.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired
};

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(Player);
