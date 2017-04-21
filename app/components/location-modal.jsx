import React from "react";
import ReactDOM from "react-dom";
import { Modal, Form, Button, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox, option } from "react-bootstrap";
import StringInput from "components/string-input";

export default class LocationModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // deep copy to be able to cancle modification
      location: JSON.parse(JSON.stringify(this.props.location))
    };

    this.nameChange = (value) => { this.setState( (prevState) => {
      let location = prevState.location;
      location.name = value;
      return { location: location };
    } ) ;};

    this.submit = () => {
      this.props.onSubmit(this.state.location);
      this.props.onClose();
    };

    this.toggleCramped = () => { this.setState( (prevState) => {
      let location = prevState.location;
      location.cramped = !location.cramped;
      return { location: location };
    } ) ;};

    this.darknessChanged = () => { this.setState( (prevState) => {
      let location = prevState.location;
      location.darkness = ReactDOM.findDOMNode(this.select).value;
      return { location: location };
    } ) ;};
  }

  render() {

    const {name, cramped, darkness} = this.state.location;
    const verb = this.props.isEdit ? "Bearbeiten" : "Hinzufügen";

    const title = verb + " von " + name;
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <StringInput controlId="ortName" title="Name" value={name} onChange={this.nameChange}/>
            <FormGroup controlId="isCrampedCheckbox">
              <Col componentClass={ControlLabel} sm={3}>
                eingeengt
              </Col>
              <Col sm={9}>
                <Checkbox checked={cramped} onChange={this.toggleCramped} >
                  Dieser Ort ist {cramped ? "" : "nicht"} eingeengt
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="darknessDropdow">
              <Col componentClass={ControlLabel} sm={3}>
                Dunkelheit
              </Col>
              <Col sm={9}>
                <FormControl componentClass="select" defaultValue={darkness} ref={select => { this.select = select; }} onChange={this.darknessChanged}>
                  <option value="0">Sicht klar und ungestört</option>
                  <option value="1">Stufe 1</option>
                  <option value="2">Stufe 2</option>
                  <option value="3">Stufe 3</option>
                  <option value="4">Stufe 4</option>
                </FormControl>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.submit}>{name} {verb}</Button>
        </Modal.Footer>
      </div>
    );
  }
}
