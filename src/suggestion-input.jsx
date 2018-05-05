import React from "react";
import Autosuggest from "react-autosuggest";
import { Col, ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

export default class SuggestionInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions (value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.data.filter(item =>
      item.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getValidationState() {
    if (this.props.value.length > 0)
    {
      return "success";
    }
    else return "error";
  }

  onSuggestionsFetchRequested ( {value} ) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const {placeholder, value, title, controlId, onChange} = this.props;
    const {suggestions} = this.state;

    const valState = this.getValidationState();

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: placeholder,
      value: value,
      onChange: onChange
    };

    return (
      <FormGroup controlId={controlId} validationState={valState}>
        <Col componentClass={ControlLabel} sm={3}>
          {title}
        </Col>
        <Col sm={9}>
          <Autosuggest
            theme={{
              input: "form-control",
              suggestionsList: "list-group",
              suggestion: "list-group-item",
              suggestionHighlighted: "suggestion-highlighted"
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <FormControl.Feedback />
          {valState === "error" && <HelpBlock>Bitte gib einen Text ein!</HelpBlock>}
        </Col>
      </FormGroup>
    );
  }
}
