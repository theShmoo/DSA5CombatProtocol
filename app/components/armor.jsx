import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";
import { ListGroup, Panel } from "react-bootstrap";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
    this.removeArmor = this.removeArmor.bind(this);
  }

  removeArmor() {
    this.props.onRemove(this.props.armor);
  }

  render() {
    const {armor, onRemove} = this.props;
    const {name, rs, be} = armor;
    const remove_tt = "Entferne die Rüstung "+ name;

    return (
      <GlyphButton ignore={!onRemove} glyph="minus" tooltip={remove_tt} onClick={this.removeArmor}>
        <Panel collapsible expanded={onRemove} header={name}>
          <ListGroup fill>
            <NumericControl title="RS" value={rs} />
            <NumericControl title="BE" value={be} />
          </ListGroup>
        </Panel>
      </GlyphButton>
    );
  }
}
