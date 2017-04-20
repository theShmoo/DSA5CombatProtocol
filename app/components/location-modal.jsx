import React from "react";
import ReactDOM from "react-dom";
import { Modal, Form, Button, Col, Row, ControlLabel, FormControl, FormGroup, Checkbox, option } from "react-bootstrap";
import StringInput from "components/string-input";

export default class LocationModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

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

  isEdit() {
    return this.props.location != undefined;
  }

  onComponentMount() {
    let location;
    if( !this.isEdit() ) {
      location = {
        name: "Ort",
        cramped: false,
        darkness: 0
      };
    }
    else {
      // deep copy the location (to be able to cancle the modification)
      location = JSON.parse(JSON.stringify(this.props.location));
    }

    this.setState({
      location: location
    });
  }

  render() {

    const {name, cramped} = this.state.location;
    const title = this.isEdit() ? "Bearbeiten des Ortes " + name : "Hinzufügen eines neuen Ortes";

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
                <FormControl componentClass="select" placeholder="Dunkelheit"
                  ref={select => { this.select = select; }} onChange={this.darknessChanged}>
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
          <Button type="submit" onClick={this.submit}>{name + this.isEdit() ? "Bearbeiten" : "Hinzufügen"}

</Button>
        </Modal.Footer>
      </div>
    );
  }
}
