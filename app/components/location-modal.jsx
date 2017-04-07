import React from "react";
import { Modal, Form, Button, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox, MenuItem, DropdownButton } from "react-bootstrap";
import StringInput from "components/string-input";

export default class LocationModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location : {
        name: "Ort",
        cramped: false,
        darkness: 0
      }
    };

    this.nameChange = (value) => { this.setState( (prevState) => {
      let location = prevState.location;
      location.name = value;
      return { location: location };
    } ) ;};

    this.addLocation = () => {
      this.props.onAdd(this.state.location);
      this.props.onClose();
    };

    this.toggleCramped = () => { this.setState( (prevState) => {
      let location = prevState.location;
      location.cramped = !location.cramped;
      return { location: location };
    } ) ;};

    this.darknessChanged = (event) => { this.setState( (prevState) => {
      let location = prevState.location;
      location.darkness = event.value;
      return { location: location };
    } ) ;};
  }

  render() {

    const {name, cramped} = this.state.location;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Hinzufügen eines neuen Ortes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <StringInput controlId="ortName" title="Name" value={name} onChange={this.nameChange}/>
            <FormGroup controlId="isCrampedCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                eingeengt
              </Col>
              <Col sm={9}>
                <Checkbox checked={cramped} onChange={this.toggleCramped} >Dieser Ort ist {cramped ? "" : "nicht"} eingeengt</Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="darknessDropdow">
              <Col componentClass={ControlLabel} sm={3}>
                Dunkelheit
              </Col>
              <Col sm={9}>
                <DropdownButton title="Dunkelheit" onSelect={this.darknessChanged}>
                  <MenuItem eventKey="0">Sicht klar und ungestört</MenuItem>
                  <MenuItem eventKey="1">Stufe 1</MenuItem>
                  <MenuItem eventKey="2">Stufe 2</MenuItem>
                  <MenuItem eventKey="3">Stufe 3</MenuItem>
                  <MenuItem eventKey="4">Stufe 4</MenuItem>
                </DropdownButton>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.addLocation}>{name} Hinufügen</Button>
        </Modal.Footer>
      </div>
    );
  }
}
