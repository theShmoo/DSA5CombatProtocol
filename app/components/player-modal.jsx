import React from "react";
import { Modal, Tooltip, OverlayTrigger, Button, Form, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox } from "react-bootstrap";
import {newHero, newEnemy} from "components/default-hero";
import NumericInput from "components/numeric-input";
import StringInput from "components/string-input";
import Weapon from "components/weapon";
import Armor from "components/armor";
import WeaponForm from "components/weapon-form";
import ArmorForm from "components/armor-form";

export default class PlayerModal extends React.Component {

  constructor(props) {
    super(props);
    const player = props.hero ? newHero() : newEnemy();
    this.state = {
      player : player
    };
    this.addPlayer = () => { this.props.onAdd(this.state.player); this.props.onClose(); };
    this.nameChange = this.nameChange.bind(this);
    this.lepChange = this.lepChange.bind(this);
    this.iniChange = this.iniChange.bind(this);

    this.isMage = this.isMage.bind(this);
    this.aspChange = this.aspChange.bind(this);

    this.isPriest = this.isPriest.bind(this);
    this.kapChange = this.kapChange.bind(this);

    this.removeWeapon = this.removeWeapon.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.removeArmor = this.removeArmor.bind(this);
    this.addArmor = this.addArmor.bind(this);
  }

  nameChange (value) {
    let player = this.state.player;
    player.name = value;
    this.setState({player: player});
  }

  lepChange (value) {
    let player = this.state.player;
    player.lep.start = value;
    this.setState({player: player});
  }

  iniChange (value) {
    let player = this.state.player;
    player.ini.start = value;
    this.setState({player: player});
  }

  isMage () {
    let player = this.state.player;
    player.mage = !player.mage;
    this.setState({ player: player });
  }

  aspChange (value) {
    let player = this.state.player;
    player.asp.start = value;
    this.setState({player: player});
  }

  isPriest () {
    let player = this.state.player;
    player.priest = !player.priest;
    this.setState({ player: player });
  }

  kapChange (value) {
    let player = this.state.player;
    player.kap.start = value;
    this.setState({player: player});
  }

  addArmor (armor) {
    console.log("add armor " + armor.name);
    this.setState((prevState) => {
      let armorsCopy = prevState.player.armors.slice();
      prevState.player.armors = armorsCopy.concat([armor]);
      return {
        player: prevState.player
      };});
  }

  removeArmor (armor) {
    console.log("Remove armor " + armor.name);
    let player = this.state.player;
    let i = player.armors.findIndex(w => w.name == armor.name); // find index of armor
    if(i >= 0)
    {
      player.armors.splice(i, 1);
      this.setState({
        player: player
      });
    }
  }

  addWeapon (weapon) {
    console.log("add weapon " + weapon.name);
    this.setState((prevState) => {
      let weaponsCopy = prevState.player.weapons.slice();
      prevState.player.weapons = weaponsCopy.concat([weapon]);
      return {
        player: prevState.player
      };});
  }

  removeWeapon (weapon) {
    console.log("Remove weapon " + weapon.name);
    let player = this.state.player;
    let i = player.weapons.findIndex(w => w.name == weapon.name); // find index of weapon
    if(i >= 0)
    {
      player.weapons.splice(i, 1);
      this.setState({
        player: player
      });
    }
  }

  createWeapon(weapon, id) {
    return (<Weapon weapon={weapon} key={id} onRemove={this.removeWeapon}/>);
  }

  createArmor(armor, id) {
    return (<Armor armor={armor} key={id} onRemove={this.removeArmor}/>);
  }

  render() {
    const {hero} = this.props;
    const player_title_gen = hero ? "Helden" : "Gegners";

    const {name, asp, kap, priest, mage} = this.state.player;
    let weapons = this.state.player.weapons.map((w,i) => {return this.createWeapon(w,i);});
    let armors = this.state.player.armors.map((a,i) => {return this.createArmor(a,i);});

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Hinzufügen eines neuen {player_title_gen}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <StringInput controlId="playerName" title="Name" value={name} onChange={this.nameChange}/>
            <NumericInput controlId="playerLep" title="Lebenspunkte" value={this.state.player.lep.start} onChange={this.lepChange}/>
            <NumericInput controlId="playerIni" title="Initiative" value={this.state.player.ini.start} onChange={this.iniChange}/>
            <FormGroup controlId="isMageCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                Zauberer
              </Col>
              <Col sm={9}>
                <Checkbox checked={mage} onChange={this.isMage} >Füge Astralpunkte hinzu</Checkbox>
              </Col>
            </FormGroup>
            <NumericInput show={mage} controlId="playerAsp" title="Astralpunkte" value={asp.start} onChange={this.aspChange}/>
            <FormGroup controlId="isPriestCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                Geweihter
              </Col>
              <Col sm={9}>
                <Checkbox checked={priest} onChange={this.isPriest} >Füge Karmapunkte hinzu</Checkbox>
              </Col>
            </FormGroup>
            <NumericInput show={priest} controlId="playerKap" title="Karmapunkte" value={kap.start} onChange={this.kapChange}/>
            <WeaponForm onAdd={this.addWeapon} />
            <FormGroup controlId="removeWeapon">
              <Col sm={12}>
                {weapons}
              </Col>
            </FormGroup>
            <ArmorForm onAdd={this.addArmor} />
            <FormGroup controlId="removeArmor">
              <Col sm={12}>
                {armors}
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.addPlayer}>{name} Hinufügen</Button>
        </Modal.Footer>
      </div>
    );
  }
}
