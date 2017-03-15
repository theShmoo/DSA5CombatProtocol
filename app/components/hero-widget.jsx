import React from "react";
import GlyphButton from "components/glyph-button";

export default class HeroWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addHero = this.addHero.bind(this);
  }

  addHero() {
    var hero = {
      hero: true,
      name: "test",
      lp: {max: 30},
      weapons: [
        {
          name: "Waffenlos",
          at: 12,
          pa: 8,
          rw: "kurz"
        }
      ],
      armor: {
        name: "Kettenhemd",
        rs: 4,
        be: 1
      }
    };
    this.props.onAdd(hero);
  }

  render() {
    const title = "Helden";
    const add_tt = "Einen Helden hinzufügen";

    return (
      <div>
        <div className="clearboth">
          <span><h3>{title}</h3></span>
          <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.addHero} />
        </div>
        <div>
          {this.props.players}
        </div>
      </div>
    );
  }
}
