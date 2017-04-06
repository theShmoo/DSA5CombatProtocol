import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import StringInput from "components/string-input";

export default class LocationModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location : {name: "Ort"}
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
  }

  render() {

    const {name} = this.state.location;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Hinzufügen eines neuen Ortes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <StringInput controlId="ortName" title="Name" value={name} onChange={this.nameChange}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.addLocation}>{name} Hinufügen</Button>
        </Modal.Footer>
      </div>
    );
  }
}
