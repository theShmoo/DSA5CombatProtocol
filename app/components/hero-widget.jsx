import React from "react";
import AddButton from "components/add-button";
import Hero from "components/hero";

export default class HeroWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addHero = this.addHero.bind(this);
  }

  addHero() {
    var hero = (<Hero name="test" lep={30} at={8} pa={8} />);
    this.props.onAdd(hero);
  }

  render() {
    const title = "Helden";
    const add_tt = "Einen Helden hinzufügen";

    return (
      <div>
        <div className="clearboth">
          <span><h3>{title}</h3></span>
          <AddButton onClick={this.addHero} tooltip={add_tt}/>
        </div>
        <div>
          {this.props.heros}
        </div>
      </div>
    );
  }
}
