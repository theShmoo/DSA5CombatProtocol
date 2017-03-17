import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";

export default class Weapon extends React.Component {

  constructor(props) {
    super(props);
    this.removeWeapon = this.removeWeapon.bind(this);
  }

  removeWeapon() {
    this.props.onRemove(this.props.name);
  }

  render() {
    const {name, at, pa, rw, onRemove} = this.props;
    const remove_tt = "Entferne die Waffe "+ name;

    return (
     <GlyphButton ignore={!onRemove} glyph="minus" tooltip={remove_tt} onClick={this.removeWeapon}>
          <dt>{name}</dt>
          <dd>
            <dl className="dl-inline">
              <NumericControl title="AT" value={at} />
              <NumericControl title="PA" value={pa} />
              <PlayerProperty title="RW">
                {rw}
              </PlayerProperty>
            </dl>
          </dd>
      </GlyphButton>
    );
  }
}
