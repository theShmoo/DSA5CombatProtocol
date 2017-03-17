import React from "react";
import { ControlLabel, Col, FormGroup, FormControl, HelpBlock } from "react-bootstrap";

function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
}

export default class NumericInput extends React.Component {

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
    if (isInt(value))
    {
      if(value < 0) return "warning";
      return "success";
    }
    else return "error";
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value: value });
    if(this.getValidationState(value) != "error")
    {
      this.props.onChange(parseInt(value));
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
            {valState === "error" && <HelpBlock>Bitte gib nur Zahlen ein!</HelpBlock>}
            {valState === "warning" && <HelpBlock>Negative Zahlen sind eigenartig</HelpBlock>}
          </Col>
        </FormGroup>
    );
  }
}

NumericInput.defaultProps = {
  show: true
};

