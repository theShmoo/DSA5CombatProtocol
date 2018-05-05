import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PlayerProperty from "./player-property";
import NumericControl from "./numeric-control";
import GlyphButton from "./glyph-button";
import HeadedTogglePanel from "./HeadedTogglePanel";

export default class RangeWeapon extends Component {

  constructor(props) {
    super(props);
    this.removeRangeWeapon = () => {this.props.onRemove(this.props.rangeWeapon);};
    this.fkChange = (value) => {this.props.onEdit(this.props.rangeWeapon.name, "fk", value);};
    this.schussChange = (value) => {this.props.onEdit(this.props.rangeWeapon.name, "schuss", value);};
  }

  renderHeader() {
    const {rangeWeapon, onRemove} = this.props;
    const {name} = rangeWeapon;
    const remove_tt = "Entferne die Rüstung "+ name;
    const isIgnored = !onRemove;

    return (
      <GlyphButton ignore={isIgnored} glyph="minus" tooltip={remove_tt} onClick={this.removeRangeWeapon}>
        <h5>{name}</h5>
      </GlyphButton>
    );
  }

  render() {
    const {rangeWeapon, onRemove} = this.props;
    const {fk, grundschaden, bonus, schuss, munition, lade, reichweite} = rangeWeapon;
    const isIgnored =  !onRemove;

    return (
      <HeadedTogglePanel expanded={!isIgnored} header={this.renderHeader()}>
        <ListGroup>
          <NumericControl title="FK" value={fk} onChange={this.fkChange} />
          <NumericControl title={munition} value={schuss} onChange={this.schussChange} />
          <PlayerProperty title="Ladezeit">
            {lade}
          </PlayerProperty>
          <PlayerProperty title="Reichweite">
            {reichweite.nah} / {reichweite.mittel} / {reichweite.weit}
          </PlayerProperty>
          <PlayerProperty title="TP">
            {grundschaden + bonus}
          </PlayerProperty>
        </ListGroup>
      </HeadedTogglePanel>
    );
  }
}
