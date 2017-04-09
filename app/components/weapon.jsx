import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";
import {getAtBoni, getPaBoni} from "components/bonusCalculations";
import { ListGroup, Panel } from "react-bootstrap";

export default class Weapon extends React.Component {

  constructor(props) {
    super(props);
    this.removeWeapon = this.removeWeapon.bind(this);
    this.atChange = (value) => {this.props.onEdit(this.props.weapon.name, "at", value);};
    this.paChange = (value) => {this.props.onEdit(this.props.weapon.name, "pa", value);};
  }

  removeWeapon() {
    this.props.onRemove(this.props.weapon);
  }

  renderHeader() {
    const {weapon, onRemove} = this.props;
    const {name} = weapon;
    const remove_tt = "Entferne die Waffe "+ name;
    const isIgnored = !onRemove;

    return (
      <GlyphButton ignore={isIgnored} glyph="minus" tooltip={remove_tt} onClick={this.removeWeapon}>
        <h5>{name}</h5>
      </GlyphButton>
    );
  }

  render() {
    const {weapon, states, onRemove} = this.props;
    const {at, pa, rw, grundschaden, bonus} = weapon;
    const isIgnored =  !onRemove;

    return (
        <Panel collapsible defaultExpanded={!isIgnored} header={this.renderHeader()}>
          <ListGroup fill>
            <NumericControl tooltip="Attacke" title="AT"
              states={getAtBoni(states, rw)}
              value={at} onChange={this.atChange} />
            <NumericControl tooltip="Parade" title="PA"
              states={getPaBoni(states, rw)}
              value={pa} onChange={this.paChange} />
            <PlayerProperty tooltip="Reichweite" title="RW">
              {rw}
            </PlayerProperty>
            <PlayerProperty tooltip="Trefferpunkte" title="TP">
              {grundschaden + bonus}
            </PlayerProperty>
          </ListGroup>
        </Panel>
    );
  }
}
