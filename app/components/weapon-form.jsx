import React from "react";
import NumericInput from "components/numeric-input";
import StringInput from "components/string-input";
import SuggestionInput from "components/suggestion-input";
import {weaponList} from "components/weapon-list";
import { Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";

export default class WeaponForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      at: {start: 10},
      pa: {start: 6},
      rw: "",
      grundschaden: "1W6",
      bonus: "+4",
      showForm: false
    };

    this.nameChange = this.nameChange.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.atChange = (value) => { this.setState({at: {start: value}}); };
    this.paChange = (value) => { this.setState({pa: {start: value}}); };
    this.rwChange = (e) => { this.setState({rw: e.target.value}); };
    this.grundschadenChange = (e) => { this.setState({grundschaden: e.target.value}); };
    this.bonusChange = (e) => { this.setState({bonus: e.target.value}); } ;

  }

  addWeapon (e) {
    e.preventDefault();
    if(!this.state.showForm)
    {
      this.setState({showForm: true});
    }
    else if(this.state.name != "")
    {
      const weapon = {
        name: this.state.name,
        at: this.state.at,
        pa: this.state.pa,
        rw: this.state.rw,
        grundschaden: this.state.grundschaden,
        bonus: this.state.bonus
      };
      this.props.onAdd(weapon);
      this.setState({showForm: false});
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let weapon = weaponList.filter(weapon => weapon.name === newValue);
    if(weapon && weapon.length==1) {
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
    const {at, pa, rw, grundschaden, bonus, showForm, name} = this.state;

    return (
      <FormGroup controlId="addWeapon">
        <Col componentClass={ControlLabel} sm={3}>
          Waffen
        </Col>
        <Col sm={9} style={this.state.showForm ? {} : {display: "none"}}>
          <SuggestionInput
            controlId="weaponName"
            title="Name"
            value={name}
            placeholder="Füge einen Namen hinzu"
            data={weaponList}
            onChange={this.nameChange} />
          <NumericInput controlId="at" title="Attacke" value={at.start} onChange={this.atChange}/>
          <NumericInput controlId="pa" title="Parade" value={pa.start} onChange={this.paChange}/>
          <FormGroup controlId="weaponTP">
            <Col componentClass={ControlLabel} sm={3}>
              Trefferpunkte
            </Col>
            <Col sm={5}>
              <FormControl type="text" value={grundschaden} onChange={this.grundschadenChange}/>
            </Col>
            <Col sm={4}>
              <FormControl type="text" value={bonus} onChange={this.bonusChange}/>
            </Col>
          </FormGroup>
          <StringInput controlId="weaponRW" title="Reichweite" value={rw} onChange={this.rwChange}/>
        </Col>
        <Col
          smOffset={showForm ? 3 : 0}
          sm={9}>
          <Button onClick={this.addWeapon}>
            Waffe hinzufügen
          </Button>
        </Col>
      </FormGroup>
    );
  }
}
