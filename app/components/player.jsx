import React from "react";
import GlyphButton from "components/glyph-button";


export default class Player extends React.Component {

  constructor(props) {
    super(props);
    this.removePlayer = this.removePlayer.bind(this);
  }

  removePlayer() {
    this.props.onRemove(this.props.name);
  }

  render() {
    const remove_tt = "Entferne den Helden " + this.props.name;
    return (
      <div>
        <div className="clearboth">
          <span><h3>{this.props.name}</h3></span>
          <GlyphButton glyph="minus" tooltip={remove_tt} onClick={this.removePlayer} />
        </div>
        <ul className="list">
          {this.props.children}
        </ul>
      </div>
    );
  }
}
Player.defaultProps = {
  graveyard: false,
  location_id: ""
};
