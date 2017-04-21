import React, { Component, PropTypes } from "react";
import EditButtons from "components/edit-buttons";
import Player from "components/player";
import LocationModal from "components/location-modal";
import { ItemTypes } from "components/constants";
import { Col, Row, Modal } from "react-bootstrap";
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

    this.state = { showModal: false };
    this.openModal = () => {this.setState({showModal: true});};
    this.closeModal = () => {this.setState({showModal: false});};

    this.removeLocation = () => {this.props.onRemove(this.props.location.id);};
    this.duplicateLocation = () => {this.props.onDuplicate(this.props.location.id);};
    this.editLocation = (location) => {this.props.onEdit(this.props.location.id, location);};
  }

  createPlayer(player) {
    const {onPlayerRemove, onPlayerDuplicate, onPlayerMove, onPlayerEdit, onPlayerEditProperty, onGearEdit} = this.props;
    return (
      <Player
        player={player}
        key={player.id}
        id={player.id}
        onRemove={onPlayerRemove}
        onDuplicate={onPlayerDuplicate}
        onMove={onPlayerMove}
        onEdit={onPlayerEdit}
        onEditProperty={onPlayerEditProperty}
        onGearEdit={onGearEdit}
        />
    );
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

  renderTitle(name, removeable) {
    const title = (<h3>{name}</h3>);

    if(!removeable) {
      return title;
    }
    else {
      return (
        <EditButtons title={name}
          onRemove={this.removeLocation}
          onEdit={this.openModal}
          onDuplicate={this.duplicateLocation}>
          {title}
        </EditButtons>
      );
    }
  }

  render() {
    const { location, id, players, showtitle, removeable } = this.props;
    const {name} = location;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    let filtered_players = "";
    if(players.length > 0)
      filtered_players = players.filter(p => p.location == id).map((p) => {return this.createPlayer(p);});

    return connectDropTarget(
       <div className="location">
        {showtitle && this.renderTitle(name, removeable)}
        <div className="player-area">
          {filtered_players}
          {isOver && !canDrop && this.renderOverlay("red")}
          {!isOver && canDrop && this.renderOverlay("yellow")}
          {isOver && canDrop && this.renderOverlay("green")}
        </div>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal} >
          <LocationModal isEdit={true} location={location} onSubmit={this.editLocation} onClose={this.closeModal} />
        </Modal>
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
