import React from "react";
import { Row, Grid, Col } from "react-bootstrap";
import HeroWidget from "components/hero-widget";
import EnemyWidget from "components/enemy-widget";
import LocationWidget from "components/location-widget";
import Player from "components/player";
import LifePoints from "components/life-points";
import Weapon from "components/weapon";
import Armor from "components/armor";

export default class CombatProtocol extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      players: [],
    };

    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  addPlayer(player) {
    console.log("add player " + player.name);
    this.setState({
      players: this.state.players.concat([player])
    });
  }

  addLocation(location) {
    console.log("add location");
    this.setState({
      locations: this.state.locations.concat([location])
    });
  }

  removePlayer(playername) {
    console.log("Remove player " + playername);
    var clonedPlayers = this.state.players.slice(); //copy array
    var i = clonedPlayers.indexOf(player); // find index of player
    if(i >= 0)
    {
      this.setState({
        players: this.state.players.splice(i, 1)
      });
    }
  }

  removeLocation(locationname) {
    console.log("Remove Location " + locationname);
    var clonedLocations = this.state.locations.slice(); //copy array
    var i = clonedLocations.indexOf(location); // find index of location
    if(i >= 0)
    {
      this.setState({
        locations: this.state.locations.splice(i, 1)
      });
    }
  }

  createWeapon(weapon) {
    return (<Weapon name={weapon.name} key={weapon.name} at={weapon.at} pa={weapon.pa} rw={weapon.rw} />);
  }

  createArmor(armor) {
    return (<Armor name={armor.name} rs={armor.rs} be={armor.be} />);
  }

  createPlayer(player) {
    let weapons = player.weapons.map((w) => {return this.createWeapon(w);});
    let armor = this.createArmor(player.armor);
    return (
      <Player name={player.name} key={player.name} onRemove={this.props.removePlayer}>
        <LifePoints max={player.lp.max} />
        {weapons}
        {armor}
      </Player>);
  }

  render() {
    let players = this.state.players.map((p) => {return this.createPlayer(p);});
    return (
      <Grid>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <HeroWidget
              players={players}
              onAdd={this.addPlayer} />
          </Col>
          <Col lg={6} md={6} sm={12}>
            <EnemyWidget
              players={players}
              onAdd={this.addPlayer} />
          </Col>
        </Row>
        <Row className="show-grid">
          <LocationWidget
            locations={this.state.locations}
            players={players}
            onAdd={this.addLocation} />
        </Row>
      </Grid>
    );
  }
}
