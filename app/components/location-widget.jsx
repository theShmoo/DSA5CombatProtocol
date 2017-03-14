import React from "react";
import AddButton from "components/add-button";

export default class LocationWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addLocation = this.addLocation.bind(this);
  }

  addLocation() {
    console.log("add location");
  }

  render() {
    const title = "Orte";
    const add_tt = "Einen Ort hinzufügen";
    return (
      <div className="clearboth">
        <span><h3>{title}</h3></span>
        <AddButton onClick={this.addLocation} tooltip={add_tt}/>
      </div>
    );
  }
}
