import React from "react";
import AddButton from "components/add-button";

export default class EnemyWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addEnemy = this.addEnemy.bind(this);
  }

  addEnemy() {
    console.log("add enemy");
  }

  render() {
    const title = "Gegner";
    const add_tt = "Einen Gegner hinzufügen";
    return (
      <div className="clearboth">
        <span><h3>{title}</h3></span>
        <AddButton onClick={this.addEnemy} tooltip={add_tt}/>
      </div>
    );
  }
}
