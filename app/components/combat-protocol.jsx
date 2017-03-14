import React from "react";
import { Row, Grid, Col } from "react-bootstrap";
import HeroWidget from "components/hero-widget";
import EnemyWidget from "components/enemy-widget";
import LocationWidget from "components/location-widget";

export default class CombatProtocol extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      heros: [],
      enemies: []
    };

    this.addHero = this.addHero.bind(this);
    this.removeHero = this.removeHero.bind(this);

    this.addEnemy = this.addEnemy.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  addHero(hero) {
    this.setState({
      heros: this.state.heros.concat([hero])
    });
  }

  addEnemy(enemy) {
    this.setState({
      enemies: this.state.enemies.concat([enemy])
    });
  }

  addLocation(location) {
    this.setState({
      locations: this.state.locations.concat([location])
    });
  }

  removeHero(hero) {
    var clonedHeros = this.state.heros.slice(); //copy array
    var i = clonedHeros.indexOf(hero); // find index of hero
    if(i >= 0)
    {
      this.setState({
        heros: this.state.heros.splice(i, 1)
      });
    }
  }

  removeEnemy(enemy) {
    var clonedEnemy = this.state.enemies.slice(); //copy array
    var i = clonedEnemy.indexOf(enemy); // find index of enemy
    if(i >= 0)
    {
      this.setState({
        enemies: this.state.enemies.splice(i, 1)
      });
    }
  }

  removeLocation(location) {
    var clonedLocations = this.state.locations.slice(); //copy array
    var i = clonedLocations.indexOf(location); // find index of location
    if(i >= 0)
    {
      this.setState({
        locations: this.state.locations.splice(i, 1)
      });
    }
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col lg={6} md={6} sm={12}>
            <HeroWidget
              heros={this.state.heros}
              onAdd={this.addHero}
              onRemove={this.removeHero} />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <EnemyWidget
              enemies={this.state.enemies}
              onAdd={this.addEnemy}
              onRemove={this.removeEnemy} />
          </Col>
        </Row>
        <Row className="show-grid">
          <LocationWidget
            locations={this.state.locations}
            onAdd={this.addLocation}
            onRemove={this.removeLocation} />
        </Row>
      </Grid>
    );
  }
}
