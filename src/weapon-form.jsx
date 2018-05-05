import React, { Component } from "react";
import { Modal, Form, Button, Col, ControlLabel, FormGroup } from "react-bootstrap";
import NumericInput from "./numeric-input";
import StringInput from "./string-input";
import SuggestionInput from "./suggestion-input";
import {weaponList} from "./weapon-list";

export default class WeaponForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      at: {start: 10},
      pa: {start: 6},
      rw: "",
      grundschaden: "1W6",
      bonus: "+4"
    };

    this.nameChange = this.nameChange.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.atChange = (value) => { this.setState({at: {start: value}}); };
    this.paChange = (value) => { this.setState({pa: {start: value}}); };
    this.rwChange = (value) => { this.setState({rw: value}); };
    this.grundschadenChange = (e) => { this.setState({grundschaden: e.target.value}); };
    this.bonusChange = (e) => { this.setState({bonus: e.target.value}); } ;
  }

  checkState() {
    return this.state.name !== "";
  }

  addWeapon (e) {
    e.preventDefault();
    if(this.checkState())
    {
      const weapon = {
        name: this.state.name,
        at: this.state.at,
        pa: this.state.pa,
        rw: this.state.rw,
        grundschaden: this.state.grundschaden,
        bonus: this.state.bonus,
        type: "weapon"
      };
      this.props.onAdd(weapon);
      this.props.onClose();
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let weapon = weaponList.filter(weapon => weapon.name === newValue);
    if(weapon && weapon.length === 1) {
      this.setState({
        name: newValue,
        rw: weapon[0].rw,
        grundschaden: weapon[0].grundschaden,
        bonus: weapon[0].bonus
      });
    }
    else {
      this.setState({
        name: newValue
      });
    }
  }

  render() {
    const {at, pa, rw, grundschaden, bonus, name} = this.state;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Bearbeiten einer Nahkampfwaffe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <SuggestionInput
            controlId="weaponName"
            title="Name"
            value={name}
            placeholder="Füge einen Namen hinzu"
            data={weaponList}
            onChange={this.nameChange} />
          <NumericInput controlId="at" title="Attacke" value={at.start} onChange={this.atChange}/>
          <NumericInput controlId="pa" title="Parade" value={pa.start} onChange={this.paChange}/>
          <FormGroup controlId="damage">
            <Col componentClass={ControlLabel} sm={3}>
              Schaden
            </Col>
            <Col sm={4}>
                <StringInput controlId="grundschaden" title="TP" value={grundschaden} onChange={this.grundschadenChange}/>
            </Col>
            <Col sm={5}>
                <StringInput controlId="bonus" title="Bonus" value={bonus} onChange={this.bonusChange}/>
            </Col>
          </FormGroup>
          <StringInput controlId="weaponRW" title="Reichweite" value={rw} onChange={this.rwChange}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={this.addWeapon}>{name} Hinzufügen

</Button>
      </Modal.Footer>
    </div>
    );
  }
}
