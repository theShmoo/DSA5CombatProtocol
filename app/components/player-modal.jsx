import React from "react";
import { Modal, Tooltip, OverlayTrigger, Button, Form, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox } from "react-bootstrap";
import {newHero, newEnemy} from "components/default-hero";
import NumericInput from "components/numeric-input";
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
    this.addPlayer = this.addPlayer.bind(this);
    this.isZauberer = this.isZauberer.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.lepChange = this.lepChange.bind(this);
    this.iniChange = this.iniChange.bind(this);
    this.aspChange = this.aspChange.bind(this);

    this.removeWeapon = this.removeWeapon.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.removeArmor = this.removeArmor.bind(this);
    this.addArmor = this.addArmor.bind(this);
  }

  addPlayer() {
    this.props.onAdd(this.state.player);
    this.props.onClose();
  }

  isZauberer () {
    let player = this.state.player;
    player.asp.mage = !player.asp.mage;
    this.setState({ player: player });
  }

  nameChange (e) {
    let player = this.state.player;
    player.name = e.target.value;
    this.setState({player: player});
  }

  lepChange (value) {
    let player = this.state.player;
    player.lp.max = value;
    this.setState({player: player});
  }

  iniChange (value) {
    let player = this.state.player;
    player.ini.basis = value;
    this.setState({player: player});
  }

  aspChange (value) {
    let player = this.state.player;
    player.asp.max = value;
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

  removeArmor (armor_name) {
    console.log("Remove armor " + armor_name);
    let player = this.state.player;
    let i = player.armors.findIndex(w => w.name == armor_name); // find index of armor
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

  removeWeapon (weapon_name) {
    console.log("Remove weapon " + weapon_name);
    let player = this.state.player;
    let i = player.weapons.findIndex(w => w.name == weapon_name); // find index of weapon
    if(i >= 0)
    {
      player.weapons.splice(i, 1);
      this.setState({
        player: player
      });
    }
  }

  createWeapon(weapon) {
    return (<Weapon name={weapon.name} key={weapon.name} at={weapon.at} pa={weapon.pa} rw={weapon.rw} onRemove={this.removeWeapon}/>);
  }

  createArmor(armor) {
    return (<Armor name={armor.name} key={armor.name} rs={armor.rs} be={armor.be} onRemove={this.removeArmor}/>);
  }

  render() {
    const {hero} = this.props;
    const player_title_gen = hero ? "Helden" : "Gegners";

    const {name} = this.state.player;
    const {mage, max} = this.state.player.asp;
    let weapons = this.state.player.weapons.map((w) => {return this.createWeapon(w);});
    let armors = this.state.player.armors.map((a) => {return this.createArmor(a);});

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Hinzufügen eines neuen {player_title_gen}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup controlId="playerName">
              <Col componentClass={ControlLabel} sm={3}>
                Name
              </Col>
              <Col sm={9}>
                <FormControl type="text" value={name} onChange={this.nameChange}/>
              </Col>
            </FormGroup>
            <NumericInput controlId="playerLep" title="Lebenspunkte" value={this.state.player.lp.max} onChange={this.lepChange}/>
            <NumericInput controlId="playerIni" title="Initiative" value={this.state.player.ini.basis} onChange={this.iniChange}/>
            <FormGroup controlId="isMageCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                Zauberer
              </Col>
              <Col sm={9}>
                <Checkbox checked={mage} onChange={this.isZauberer} >Füge Astralpunkte hinzu</Checkbox>
              </Col>
            </FormGroup>
            <NumericInput show={mage} controlId="playerLep" title="Astralpunkte" value={max} onChange={this.aspChange}/>
            <WeaponForm onAdd={this.addWeapon} />
            <FormGroup controlId="removeWeapon">
              <Col sm={3}>
              </Col>
              <Col sm={9}>
                <dl>
                  {weapons}
                </dl>
              </Col>
            </FormGroup>
            <ArmorForm onAdd={this.addArmor} />
            <FormGroup controlId="removeArmor">
              <Col sm={3}>
              </Col>
              <Col sm={9}>
                <dl>
                  {armors}
                </dl>
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
