import React from "react";
import NumericInput from "components/numeric-input";
import {armorList} from "components/weapon-list";
import { Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : armorList.filter(armor =>
    armor.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

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

export default class ArmorForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      rs: 3,
      be: 0,
      showForm: false,
      suggestions: []
    };

    this.rsChange = this.rsChange.bind(this);
    this.beChange = this.beChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addArmor = this.addArmor.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  addArmor (e) {
    e.preventDefault();
    if(!this.state.showForm)
    {
      this.setState({showForm: true});
    }
    else if(this.state.name != "")
    {
      const armor = {
        name: this.state.name,
        rs: this.state.rs,
        be: this.state.be,
        rw: this.state.rw
      };
      this.props.onAdd(armor);
      this.setState({showForm: false});
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let armor = armorList.filter(armor => armor.name === newValue);
    if(armor && armor.length==1) {
      this.setState({
        name: newValue,
        rs: parseInt(armor[0].rs),
        be: parseInt(armor[0].be)
      });
    }
    else {
      this.setState({
        name: newValue
      });
    }
  }

  onSuggestionsFetchRequested ( {value} ) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  }

  rsChange (value) {
    this.setState({rs: value});
  }

  beChange (value) {
    this.setState({be: value});
  }

  render() {
    const {rs, be, showForm, name, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: "Füge einen Namen hinzu",
      value: name,
      onChange: this.nameChange
    };

    return (
      <FormGroup controlId="addArmor">
        <Col componentClass={ControlLabel} sm={3}>
          Rüstungen
        </Col>
        <Col sm={9} style={showForm ? {} : {display: "none"}}>
          <FormGroup controlId="armorName">
            <Col componentClass={ControlLabel} sm={3}>
              Name
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
            </Col>
          </FormGroup>
          <NumericInput controlId="rs" title="RS" value={rs} onChange={this.rsChange}/>
          <NumericInput controlId="be" title="Behinderung" value={be} onChange={this.beChange}/>
        </Col>
        <Col
          smOffset={showForm ? 3 : 0}
          sm={9}>
          <Button type="submit" onClick={this.addArmor}>
            Rüstung hinzufügen
          </Button>
        </Col>
      </FormGroup>
    );
  }
}
