import React from "react";
import NumericInput from "components/numeric-input";
import {armorList} from "components/weapon-list";
import SuggestionInput from "components/suggestion-input";
import { Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";

export default class ArmorForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rs: {start: 0},
      be: {start: 0},
      showForm: false
    };

    this.nameChange = this.nameChange.bind(this);
    this.addArmor = this.addArmor.bind(this);

    this.rsChange = (value) => { this.setState({rs: {start: value}}); };
    this.beChange = (value) => { this.setState({be: {start: value}}); };
  }

  addArmor (e) {
    e.preventDefault();
    if(!this.state.showForm)
    {
      this.setState({showForm: true});
    }
    else if(this.state.name != "")
    {
      const armor = {
        name: this.state.name,
        rs: this.state.rs,
        be: this.state.be,
        rw: this.state.rw
      };
      this.props.onAdd(armor);
      this.setState({showForm: false});
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let armor = armorList.filter(armor => armor.name === newValue);
    if(armor && armor.length==1) {
      this.setState({
        name: newValue,
        rs: {start: armor[0].rs},
        be: {start: armor[0].be}
      });
    }
    else {
      this.setState({
        name: newValue
      });
    }
  }

  render() {
    const {rs, be, showForm, name} = this.state;

    return (
      <FormGroup controlId="addArmor">
        <Col componentClass={ControlLabel} sm={3}>
          Rüstungen
        </Col>
        <Col sm={9} style={showForm ? {} : {display: "none"}}>
          <SuggestionInput
            controlId="armorName"
            title="Name"
            value={name}
            placeholder="Füge einen Namen hinzu"
            data={armorList}
            onChange={this.nameChange} />
          <NumericInput controlId="rs" title="RS" value={rs.start} onChange={this.rsChange}/>
          <NumericInput controlId="be" title="Behinderung" value={be.start} onChange={this.beChange}/>
        </Col>
        <Col
          smOffset={showForm ? 3 : 0}
          sm={9}>
          <Button onClick={this.addArmor}>
            Rüstung hinzufügen
          </Button>
        </Col>
      </FormGroup>
    );
  }
}
