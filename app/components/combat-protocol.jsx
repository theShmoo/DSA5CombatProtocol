import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import PlayerWidget from "components/player-widget";
import LocationWidget from "components/location-widget";
import Location from "components/location";
import { Row, Grid, Col } from "react-bootstrap";
import { DragDropContext } from "react-dnd";

class CombatProtocol extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location_id: 1,
      players: [],
      player_id: 0,
    };

    this.movePlayer = this.movePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  addPlayer(player) {
    console.log("add player " + player.name);
    player.id = this.state.player_id + 1;
    this.setState((prevState) => {
      return {
        players: prevState.players.concat([player]),
        player_id: prevState.player_id + 1
      };
    });
  }

  addLocation(location) {
    location.id = this.state.location_id + 1;
    console.log("add location " + location.id);
    this.setState((prevState) => {
      return {
        locations: prevState.locations.concat([location]),
        location_id: prevState.location_id + 1
      };
    });
  }

  removePlayer(player_id) {
    console.log("Remove player " + player_id);
    let playersCopy = this.state.players.slice();
    let i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0)
    {
      playersCopy.splice(i, 1);
      this.setState({
        players: playersCopy
      });
    }
  }

  removeLocation(location_id) {
    console.log("Remove Location " + location_id);
    let locationsCopy = this.state.locations.slice();
    let i = locationsCopy.findIndex(l => l.id == location_id); // find index of location
    if(i >= 0)
    {
      // if the location was found get all players from the location and put them back where they came from
      let playersCopy = this.state.players.slice();
      if(playersCopy.length > 0)
      {
        for (let p of playersCopy)
        {
          if(p.location == location_id)
          {
            p.location = p.hero ? 0 : 1;
            console.log("move player " + p.id + " to " + p.location);
          }
        }
      }
      locationsCopy.splice(i, 1);
      this.setState({
        locations: locationsCopy,
        players: playersCopy
      });
    }
  }

  movePlayer(player_id, location_id) {
    let playersCopy = this.state.players.slice();
    const i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0) {
      playersCopy[i].location = location_id;
      this.setState({
        players: playersCopy
      });
    }
  }

  createLocation(location) {
    return (
      <Location
        key={location.id}
        id={location.id}
        removeable showtitle
        players={this.state.players}
        onRemove={this.removeLocation}
        onPlayerRemove={this.removePlayer}
        onPlayerMove={this.movePlayer}/>
    );
  }

  render() {
    let locations = this.state.locations.map((l) => {return this.createLocation(l);});
    return (
      <Grid>
        <Row>
          <PlayerWidget
            hero
            players={this.state.players}
            onAdd={this.addPlayer}
            onRemove={this.removePlayer}
            onMove={this.movePlayer} />
          <PlayerWidget
            players={this.state.players}
            onAdd={this.addPlayer}
            onRemove={this.removePlayer}
            onMove={this.movePlayer} />
        </Row>
        <Row>
          <LocationWidget
            locations={locations}
            onAdd={this.addLocation} />
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(CombatProtocol);
