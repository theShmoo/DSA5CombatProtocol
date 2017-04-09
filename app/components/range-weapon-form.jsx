import React from "react";
import NumericInput from "components/numeric-input";
import StringInput from "components/string-input";
import SuggestionInput from "components/suggestion-input";
import {rangeWeaponList} from "components/range-list";
import { Modal, Form, Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";

export default class RangeWeaponForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      fk: {start: 13},
      reichweite: {nah: 0, mittel: 0, weit: 0},
      grundschaden: "",
      bonus: "",
      lade: "",
      schuss: {start: 10},
      munition: "",
    };

    this.nameChange = this.nameChange.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.fkChange = (value) => { this.setState({fk: {start: value}}); };

    this.ladeChange = (value) => { this.setState({lade: value}); };
    this.schussChange = (value) => { this.setState({schuss: {start: value}}); };
    this.munitionChange = (value) => { this.setState({munition: value}); };

    this.grundschadenChange = (e) => { this.setState({grundschaden: e.target.value}); };
    this.bonusChange = (e) => { this.setState({bonus: e.target.value}); };

    this.reichweiteNahChange = (value) => {this.setState({reichweite: {nah: value}}); };
    this.reichweiteMittelChange = (value) => {this.setState({reichweite: {mittel: value}}); };
    this.reichweiteWeitChange = (value) => {this.setState({reichweite: {weit: value}}); };
  }

  checkState() {
    let bOk = true;
    const {name, lade, munition} = this.state;
    bOk &= name != "";
    bOk &= lade != "";
    bOk &= munition != "";
    return bOk;
  }

  addWeapon (e) {
    e.preventDefault();
    if(this.checkState()) {
      const {name, grundschaden, bonus, fk, lade, reichweite, munition, schuss} = this.state;
      const weapon = {
        name: name,
        fk: fk,
        lade: lade,
        grundschaden: grundschaden,
        bonus: bonus,
        reichweite: reichweite,
        munition: munition,
        schuss: schuss,
        type: "range"
      };
      this.props.onAdd(weapon);
      this.props.onClose();
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let weapon = rangeWeaponList.filter(weapon => weapon.name === newValue);
    if(weapon && weapon.length==1) {
      this.setState({
        name: newValue,
        reichweite: weapon[0].reichweite,
        grundschaden: weapon[0].grundschaden,
        bonus: weapon[0].bonus,
        munition: weapon[0].munition,
        lade: weapon[0].lade
      });
    }
    else {
      this.setState({
        name: newValue
      });
    }
  }

  render() {
    const {name, grundschaden, bonus, fk, reichweite, lade, munition, schuss} = this.state;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Bearbeiten einer Fernkampfwaffe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <SuggestionInput
            controlId="rangeWeaponName"
            title="Name"
            value={name}
            placeholder="Füge einen Namen hinzu"
            data={rangeWeaponList}
            onChange={this.nameChange} />
          <NumericInput controlId="fk" title="Fernkampf" value={fk.start} onChange={this.fkChange}/>
          <NumericInput controlId="schuss" title="Schüsse" value={schuss.start} onChange={this.schussChange}/>
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
          <FormGroup controlId="range">
            <Col componentClass={ControlLabel} sm={3}>
              Reichweite
            </Col>
            <Col sm={3}>
              <NumericInput controlId="nah" title="Nah" value={reichweite.nah} onChange={this.reichweiteNahChange}/>
            </Col>
            <Col sm={3}>
              <NumericInput controlId="mittel" title="Mittel" value={reichweite.mittel} onChange={this.reichweiteMittelChange}/>
            </Col>
            <Col sm={3}>
              <NumericInput controlId="weit" title="Weit" value={reichweite.weit} onChange={this.reichweiteWeitChange}/>
            </Col>
          </FormGroup>
          <StringInput controlId="weaponRW" title="Munitions Name" value={munition} onChange={this.rwChange} />
          <StringInput controlId="weaponLade" title="Ladezeit" value={lade} onChange={this.ladeChange} />
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
