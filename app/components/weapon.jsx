import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";
import { ListGroup, Panel } from "react-bootstrap";

export default class Weapon extends React.Component {

  constructor(props) {
    super(props);
    this.removeWeapon = this.removeWeapon.bind(this);
  }

  removeWeapon() {
    this.props.onRemove(this.props.weapon);
  }

  render() {
    const {weapon, onRemove} = this.props;
    const {name, at, pa, rw, grundschaden, bonus} = weapon;
    const remove_tt = "Entferne die Waffe "+ name;

    return (
      <GlyphButton ignore={!onRemove} glyph="minus" tooltip={remove_tt} onClick={this.removeWeapon}>
        <Panel collapsible expanded={onRemove} header={name}>
          <ListGroup fill>
            <NumericControl title="AT" value={at} />
            <NumericControl title="PA" value={pa} />
            <PlayerProperty title="RW">
              {rw}
            </PlayerProperty>
            <PlayerProperty title="TP">
              {grundschaden + bonus}
            </PlayerProperty>
          </ListGroup>
        </Panel>
      </GlyphButton>
    );
  }
}
