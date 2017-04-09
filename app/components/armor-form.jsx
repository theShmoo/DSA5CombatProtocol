import React from "react";
import NumericInput from "components/numeric-input";
import {armorList} from "components/armor-list";
import SuggestionInput from "components/suggestion-input";
import { Modal, Form, Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";

export default class ArmorForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rs: {start: 0},
      be: {start: 0}
    };

    this.nameChange = this.nameChange.bind(this);
    this.addArmor = this.addArmor.bind(this);

    this.rsChange = (value) => { this.setState({rs: {start: value}}); };
    this.beChange = (value) => { this.setState({be: {start: value}}); };
  }

  checkState() {
    return this.state.name != "";
  }

  addArmor (e) {
    e.preventDefault();

    if(this.checkState())
    {
      const armor = {
        name: this.state.name,
        rs: this.state.rs,
        be: this.state.be,
        rw: this.state.rw,
        type: "armor"
      };
      this.props.onAdd(armor);
      this.props.onClose();
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let armor = armorList.filter(armor => armor.name === newValue);
    if(armor && armor.length==1) {
      this.setState({
        name: newValue,
        rs: {start: parseInt(armor[0].rs)},
        be: {start: parseInt(armor[0].be)}
      });
    }
    else {
      this.setState({
        name: newValue
      });
    }
  }

  render() {
    const {rs, be, name} = this.state;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Bearbeiten einer Rüstung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form horizontal>
          <SuggestionInput
            controlId="armorName"
            title="Name"
            value={name}
            placeholder="Füge einen Namen hinzu"
            data={armorList}
            onChange={this.nameChange} />
          <NumericInput controlId="rs" title="RS" value={rs.start} onChange={this.rsChange}/>
          <NumericInput controlId="be" title="Behinderung" value={be.start} onChange={this.beChange}/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={this.addArmor}>{name} Hinzufügen

</Button>
      </Modal.Footer>
    </div>
    );
  }
}
