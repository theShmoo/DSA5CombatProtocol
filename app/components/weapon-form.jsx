import React from "react";
import NumericInput from "components/numeric-input";
import {weaponList} from "components/weapon-list";
import { Button, Col, Row, ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import Autosuggest from "react-autosuggest";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : weaponList.filter(weapon =>
    weapon.name.toLowerCase().slice(0, inputLength) === inputValue
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

export default class WeaponForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "Waffenlos",
      at: 10,
      pa: 6,
      rw: "kurz",
      showForm: false,
      suggestions: []
    };

    this.atChange = this.atChange.bind(this);
    this.paChange = this.paChange.bind(this);
    this.rwChange = this.rwChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addWeapon = this.addWeapon.bind(this);

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  addWeapon (e) {
    e.preventDefault();
    if(!this.state.showForm)
    {
      this.setState({showForm: true});
    }
    else
    {
      const weapon = {
        name: this.state.name,
        at: this.state.at,
        pa: this.state.pa,
        rw: this.state.rw
      };
      this.props.onAdd(weapon);
      this.setState({showForm: false});
    }
  }

  nameChange (e, { newValue }) {
    // check if it is in the armor list
    let weapon = weaponList.filter(weapon => weapon.name === newValue);
    if(weapon && weapon.length==1) {
      this.setState({
        name: newValue,
        rw: weapon[0].rw
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

  atChange (value) {
    this.setState({at: value});
  }

  paChange (value) {
    this.setState({pa: value});
  }

  rwChange (e) {
    this.setState({rw: e.target.value});
  }

  render() {
    const {at, pa, rw, showForm, name, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: "Füge einen Namen hinzu",
      value: name,
      onChange: this.nameChange
    };

    return (
      <FormGroup controlId="addWeapon">
        <Col componentClass={ControlLabel} sm={3}>
          Waffen
        </Col>
        <Col sm={9} style={this.state.showForm ? {} : {display: "none"}}>
          <FormGroup controlId="weaponName">
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
          <NumericInput controlId="at" title="Attacke" value={at} onChange={this.atChange}/>
          <NumericInput controlId="pa" title="Parade" value={pa} onChange={this.paChange}/>
          <FormGroup controlId="weaponRW">
            <Col componentClass={ControlLabel} sm={3}>
              Reichweite
            </Col>
            <Col sm={9}>
              <FormControl type="text" value={rw} onChange={this.rwChange}/>
            </Col>
          </FormGroup>
        </Col>
        <Col
          smOffset={showForm ? 3 : 0}
          sm={9}>
          <Button type="submit" onClick={this.addWeapon}>
            Waffe hinzufügen
          </Button>
        </Col>
      </FormGroup>
    );
  }
}
