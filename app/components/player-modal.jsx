import React from "react";
import { Modal, Tooltip, OverlayTrigger, Button, Form, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox } from "react-bootstrap";
import NumericInput from "components/numeric-input";
import StringInput from "components/string-input";
import Weapon from "components/weapon";
import RangeWeapon from "components/range-weapon";
import Armor from "components/armor";
import WeaponForm from "components/weapon-form";
import RangeWeaponForm from "components/range-weapon-form";
import ArmorForm from "components/armor-form";
import GlyphButton from "components/glyph-button";

export default class PlayerModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // deep copy the player to be able to cancle the modification
      player: JSON.parse(JSON.stringify(this.props.player)),
      showRangeModal: false,
      showWeaponModal: false,
      showArmorModal: false
    };
    this.submit = () => {
      this.props.onSubmit(this.state.player);
      this.props.onClose();
    };
    this.nameChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.name = value;
      return { player: player };
    } ) ;};
    this.leChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.le = {start: value};
      return { player: player };
    } ) ;};
    this.iniChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.ini = {start: value};
      return { player: player };
    } ) ;};
    this.dodgeChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.dodge = {start: value};
      return { player: player };
    } ) ;};

    this.isMage = () => { this.setState( (prevState) => {
      let player = prevState.player;
      player.mage = !player.mage;
      return { player: player };
    } ) ;};

    this.aeChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.ae = {start: value};
      return { player: player };
    } ) ;};

    this.isPriest = () => { this.setState( (prevState) => {
      let player = prevState.player;
      player.priest = !player.priest;
      return { player: player };
    } ) ;};
    this.keChange = (value) => { this.setState( (prevState) => {
      let player = prevState.player;
      player.ke = {start: value};
      return { player: player };
    } ) ;};

    this.onGearChange = ( gear_id, prop, value) => { this.setState( (prevState) => {
      let player = prevState.player;
      let i = player.gear.findIndex(g => g.name == gear_id); // find index of gear
      player.gear[i][prop] = value;
      return { player: player };
    } ) ;};

    this.openRangeModal = () => {this.setState({showRangeModal: true});};
    this.closeRangeModal = () => {this.setState({showRangeModal: false});};
    this.openArmorModal = () => {this.setState({showArmorModal: true});};
    this.closeArmorModal = () => {this.setState({showArmorModal: false});};
    this.openWeaponModal = () => {this.setState({showWeaponModal: true});};
    this.closeWeaponModal = () => {this.setState({showWeaponModal: false});};

    this.removeGear = this.removeGear.bind(this);
    this.addGear = this.addGear.bind(this);
  }

  addGear (gear) {
    console.log("add gear " + gear.name);
    this.setState((prevState) => {
      let gearCopy = prevState.player.gear.slice();
      prevState.player.gear = gearCopy.concat([gear]);
      return {
        player: prevState.player
      };});
  }

  removeGear (gear) {
    console.log("remove gear " + gear.name);
    this.setState((prevState) => {
      let gearCopy = prevState.player.gear;
      let i = gearCopy.findIndex(g => g.name == gear.name); // find index of gear
      if(i >= 0) {
        gearCopy.splice(i, 1);
        prevState.player.gear = gearCopy;
        return {
          player: prevState.player
        };
      }
    });
  }

  createWeapon(weapon, id) {
    return (<Weapon weapon={weapon} key={id} onRemove={this.removeGear} onEdit={this.onGearChange} />);
  }

  createRangeWeapon(weapon, id) {
    return (<RangeWeapon rangeWeapon={weapon} key={id} onRemove={this.removeGear} onEdit={this.onGearChange} />);
  }

  createArmor(armor, id) {
    return (<Armor armor={armor} key={id} onRemove={this.removeGear} onEdit={this.onGearChange} />);
  }

  render() {
    const {isEdit} = this.props;
    const {name, ae, ke, priest, mage, gear, hero} = this.state.player;

    const player_title_gen = hero ? "Helden" : "Gegners";
    const verb = isEdit ? "Bearbeiten" : "Hinzufügen";

    let weapons = "";
    let armors = "";
    let rangeWeapons = "";
    if(gear.length > 0) {
      weapons = gear.filter(g => g.type == "weapon").map((w,i) => {return this.createWeapon(w,i);});
      rangeWeapons = gear.filter(g => g.type == "range").map((w,i) => {return this.createRangeWeapon(w,i);});
      armors = gear.filter(g => g.type == "armor").map((a,i) => {return this.createArmor(a,i);});
    }

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{verb} eines {player_title_gen}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <StringInput controlId="playerName" title="Name" value={name} onChange={this.nameChange}/>
            <NumericInput controlId="playerLe" title="Lebensenergie" value={this.state.player.le.start} onChange={this.leChange}/>
            <NumericInput controlId="playerIni" title="Initiative" value={this.state.player.ini.start} onChange={this.iniChange}/>
             <NumericInput controlId="playerDodge" title="Ausweichen" value={this.state.player.dodge.start} onChange={this.dodgeChange}/>
            <FormGroup controlId="isMageCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                Zauberer
              </Col>
              <Col sm={9}>
                <Checkbox checked={mage} onChange={this.isMage} >Füge Astralenergie hinzu</Checkbox>
              </Col>
            </FormGroup>
            <NumericInput show={mage} controlId="playerAe" title="Astralenergie" value={ae.start} onChange={this.aeChange}/>
            <FormGroup controlId="isPriestCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                Geweihter
              </Col>
              <Col sm={9}>
                <Checkbox checked={priest} onChange={this.isPriest} >Füge Karmaenergie hinzu</Checkbox>
              </Col>
            </FormGroup>
            <NumericInput show={priest} controlId="playerKe" title="Karmaenergie" value={ke.start} onChange={this.keChange}/>
            <FormGroup controlId="armors">
              <Col sm={12}>
                <GlyphButton glyph="plus" tooltip="Eine Neue Waffe hinzufügen" onClick={this.openWeaponModal}>
                  <ControlLabel>Waffen</ControlLabel>
                </GlyphButton>
              </Col>
              <Col sm={12}>
                {weapons}
              </Col>
            </FormGroup>
            <FormGroup controlId="range-weapons">
              <Col sm={12}>
                <GlyphButton glyph="plus" tooltip="Einen Neue Fernkampfwaffe hinzufügen" onClick={this.openRangeModal}>
                  <ControlLabel>Fernkampfwaffen</ControlLabel>
                </GlyphButton>
              </Col>
              <Col sm={12}>
                {rangeWeapons}
              </Col>
            </FormGroup>
            <FormGroup controlId="armors">
              <Col sm={12}>
                <GlyphButton glyph="plus" tooltip="Eine Neue Rüstung hinzufügen" onClick={this.openArmorModal}>
                  <ControlLabel>Rüstungen</ControlLabel>
                </GlyphButton>
              </Col>
              <Col sm={12}>
                {armors}
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.submit}>{name} {verb}</Button>
        </Modal.Footer>
        <Modal
          show={this.state.showRangeModal}
          onHide={this.closeRangeModal} >
          <RangeWeaponForm onAdd={this.addGear} onClose={this.closeRangeModal}/>
        </Modal>
        <Modal
          show={this.state.showWeaponModal}
          onHide={this.closeWeaponModal} >
          <WeaponForm onAdd={this.addGear} onClose={this.closeWeaponModal}/>
        </Modal>
        <Modal
          show={this.state.showArmorModal}
          onHide={this.closeArmorModal} >
          <ArmorForm onAdd={this.addGear} onClose={this.closeArmorModal}/>
        </Modal>
      </div>
    );
  }
}
