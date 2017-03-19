import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";
import { ListGroup, Panel } from "react-bootstrap";

export default class Weapon extends React.Component {

  constructor(props) {
    super(props);
    this.removeWeapon = this.removeWeapon.bind(this);
    this.atChange = (value) => {this.props.onEdit(this.props.id, "at", value);};
    this.paChange = (value) => {this.props.onEdit(this.props.id, "pa", value);};
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
    const {weapon, onRemove} = this.props;
    const {at, pa, rw, grundschaden, bonus} = weapon;
    const isIgnored =  !onRemove;

    return (
        <Panel collapsible defaultExpanded={!isIgnored} header={this.renderHeader()}>
          <ListGroup fill>
            <NumericControl title="AT" value={at} onChange={this.atChange} />
            <NumericControl title="PA" value={pa} onChange={this.paChange}/>
            <PlayerProperty title="RW">
              {rw}
            </PlayerProperty>
            <PlayerProperty title="TP">
              {grundschaden + bonus}
            </PlayerProperty>
          </ListGroup>
        </Panel>
    );
  }
}
