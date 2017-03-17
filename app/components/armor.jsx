import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
    this.removeArmor = this.removeArmor.bind(this);
  }

  removeArmor() {
    this.props.onRemove(this.props.name);
  }

  render() {
    const {name, rs, be, onRemove} = this.props;
    const remove_tt = "Entferne die Rüstung "+ name;

    return (
      <GlyphButton ignore={!onRemove} glyph="minus" tooltip={remove_tt} onClick={this.removeArmor}>
          <dt>{name}</dt>
          <dd>
            <dl className="dl-inline">
              <NumericControl title="RS" value={rs} />
              <NumericControl title="BE" value={be} />
            </dl>
          </dd>
      </GlyphButton>
    );
  }
}
