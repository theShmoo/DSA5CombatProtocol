import React from "react";
import PlayerProperty from "components/player-property";
import NumericControl from "components/numeric-control";
import GlyphButton from "components/glyph-button";
import { ListGroup, Panel } from "react-bootstrap";

export default class Armor extends React.Component {

  constructor(props) {
    super(props);
    this.removeArmor = this.removeArmor.bind(this);
    this.rsChange = (value) => {this.props.onEdit(this.props.armor.name, "rs", value);};
    this.beChange = (value) => {this.props.onEdit(this.props.armor.name, "be", value);};
  }

  removeArmor() {
    this.props.onRemove(this.props.armor);
  }

  renderHeader() {
    const {armor, onRemove} = this.props;
    const {name} = armor;
    const remove_tt = "Entferne die Rüstung "+ name;
    const isIgnored = !onRemove;

    return (
      <GlyphButton ignore={isIgnored} glyph="minus" tooltip={remove_tt} onClick={this.removeArmor}>
        <h5>{name}</h5>
      </GlyphButton>
    );
  }

  render() {
    const {armor, onRemove} = this.props;
    const {rs, be} = armor;
    const isIgnored =  !onRemove;

    return (
      <Panel collapsible defaultExpanded={!isIgnored} header={this.renderHeader()}>
        <ListGroup fill>
          <NumericControl tooltip="Rüstungsschutz" title="RS" value={rs} onChange={this.rsChange} />
          <NumericControl tooltip="Behinderung" title="BE" value={be} onChange={this.beChange}/>
        </ListGroup>
      </Panel>
    );
  }
}
