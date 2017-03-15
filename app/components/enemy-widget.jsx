import React from "react";
import GlyphButton from "components/glyph-button";

export default class EnemyWidget extends React.Component {

  constructor(props) {
    super(props);
    this.addEnemy = this.addEnemy.bind(this);
  }

  addEnemy() {
  var enemy = {
      hero: false,
      name: "Ork",
      lp: {max: 30},
      weapons: [
        {
          name: "Axt",
          at: 12,
          pa: 8,
          rw: "mittel"
        }
      ],
      armor: {
        name: "Lederrüstung",
        rs: 3,
        be: 1
      }
    };
    this.props.onAdd(enemy);
  }

  render() {
    const title = "Gegner";
    const add_tt = "Einen Gegner hinzufügen";
    return (
      <div className="clearboth">
        <span><h3>{title}</h3></span>
        <GlyphButton glyph="plus" tooltip={add_tt} onClick={this.addEnemy} />
      </div>
    );
  }
}
