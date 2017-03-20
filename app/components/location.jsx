import React, { Component, PropTypes } from "react";
import GlyphButton from "components/glyph-button";
import Player from "components/player";
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
    this.removeLocation = () => {this.props.onRemove(this.props.id);};
  }

  createPlayer(player) {
    return (
      <Player
        player={player}
        key={player.id}
        id={player.id}
        onRemove={this.props.onPlayerRemove}
        onMove={this.props.onPlayerMove}
        onEdit={this.props.onPlayerEdit}
        onGearEdit={this.props.onGearEdit}
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

  renderTitle(id, removeable) {
    const title = (<h3>Ort {id}</h3>);

    const remove_tt = "Entferne diesen Ort";
    const glyph = removeable ? <GlyphButton glyph="minus" tooltip={remove_tt} onClick={this.removeLocation}>{title}</GlyphButton> : {title};

    return glyph;
  }

  render() {
    const { id, players, showtitle, removeable } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    let filtered_players = "";
    if(players.length > 0)
      filtered_players = players.filter(p => p.location == id).map((p) => {return this.createPlayer(p);});

    return connectDropTarget(
       <div className="location">
        {showtitle && this.renderTitle(id, removeable)}
        <div className="player-area">
          {filtered_players}
          {isOver && !canDrop && this.renderOverlay("red")}
          {!isOver && canDrop && this.renderOverlay("yellow")}
          {isOver && canDrop && this.renderOverlay("green")}
        </div>
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
