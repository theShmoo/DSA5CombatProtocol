import React, { Component } from "react";
import { ControlLabel, Col, FormGroup, FormControl, HelpBlock } from "react-bootstrap";

export default class StringInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  getValidationState(value) {
    if (value.length > 0)
    {
      return "success";
    }
    else return "error";
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value: value });
    if(this.getValidationState(value) !== "error")
    {
      this.props.onChange(value);
    }
  }

  render() {
    const {show, contolId, placeholder} = this.props;
    const valState = this.getValidationState(this.state.value);
    return (
        <FormGroup
          style={show ? {} : {display: "none"}}
          controlId={contolId}
          validationState={valState}
        >
          <Col componentClass={ControlLabel} sm={3}>
            {this.props.title}
          </Col>
          <Col sm={9}>
            <FormControl
                type="text"
                value={this.state.value}
                placeholder={placeholder}
                onChange={this.handleChange}
            />
            <FormControl.Feedback />
            {valState === "error" && <HelpBlock>Bitte gib einen Text ein!</HelpBlock>}
          </Col>
        </FormGroup>
    );
  }
}

StringInput.defaultProps = {
  show: true
};

