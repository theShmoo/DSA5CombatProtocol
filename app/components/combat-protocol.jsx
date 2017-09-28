import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import PlayerWidget from "components/player-widget";
import LocationWidget from "components/location-widget";
import Location from "components/location";
import IniWidget from "components/ini-widget";
import SaveWidget from "components/save-widget";
import {calculateStates} from "components/state-calculations";
import { Row, Grid, Col } from "react-bootstrap";
import { DragDropContext } from "react-dnd";

// checks if the local storage exists
function supportsLocalStorage() {
  var mod = "test";
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}

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
    this.editPlayerProperty = this.editPlayerProperty.bind(this);
    this.editPlayer = this.editPlayer.bind(this);
    this.editGear = this.editGear.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.duplicatePlayer = this.duplicatePlayer.bind(this);

    this.addLocation = this.addLocation.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.duplicateLocation = this.duplicateLocation.bind(this);
    this.editLocation = this.editLocation.bind(this);

    this.hasLocalStorage = supportsLocalStorage();
  }

  loadFromLocalStorage () {
    // load local state
    if(this.hasLocalStorage) {
      console.log("load local storage");
      var storedState = JSON.parse(localStorage.getItem("state"));
      if(storedState)
      {
        this.setState({
          locations: storedState.locations,
          location_id: storedState.location_id,
          players: storedState.players,
          player_id: storedState.player_id,
        });
      }
    }
  }

  componentWillMount() {
    this.loadFromLocalStorage();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.hasLocalStorage) {
      localStorage.setItem("state", JSON.stringify(nextState));
    }
  }

  importState() {

  }

  exportState() {

  }

  updatePlayerStates(player) {
    let location = null;

    for(let l of this.state.locations) {
      if(l.id == player.location) {
        location = l; break;
      }
    }

    calculateStates(player, location);
  }

  addPlayer(player) {
    console.log("add player " + player.name);
    player.id = this.state.player_id + 1;
    this.setState((prevState) => {
      //this.updatePlayerStates(player);

      return {
        players: prevState.players.concat([player]),
        player_id: prevState.player_id + 1
      };
    });
  }

  editPlayerProperty(player_id, property, new_value) {
    console.log("Edit property " + property + " of player " + player_id );
    let playersCopy = this.state.players.slice();
    let i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0)
    {
      playersCopy[i][property] = new_value;

      this.updatePlayerStates(playersCopy[i]);
      this.setState({
        players: playersCopy
      });
    }
  }

  editPlayer(player_id, edit_player) {
    console.log("Edit player " + player_id );
    let playersCopy = this.state.players.slice();
    let i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0)
    {
      playersCopy[i] = edit_player;
      this.updatePlayerStates(playersCopy[i]);
      this.setState({
        players: playersCopy
      });
    }
  }

  duplicatePlayer(player_id) {
    console.log("Duplicate player " + player_id );
    let playersCopy = this.state.players.slice();
    let i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0)
    {
      // deep copy of player:
      let playerDuplicate = JSON.parse(JSON.stringify( playersCopy[i] ));
      this.addPlayer(playerDuplicate);
    }
  }

  editGear(player_id, gear_id, property, new_value) {
    console.log("Edit gear "+ gear_id +" player " + player_id );
    let playersCopy = this.state.players.slice();
    let i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0)
    {
      let playersGear = playersCopy[i].gear;
      let j = playersGear.findIndex(g => g.name == gear_id); // find index of gear

      playersGear[j][property] = new_value;

      this.updatePlayerStates(playersCopy[i]);

      this.setState({
        players: playersCopy
      });
    }
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

  movePlayer(player_id, location_id) {
    let playersCopy = this.state.players.slice();
    const i = playersCopy.findIndex(p => p.id == player_id); // find index of player
    if(i >= 0) {
      playersCopy[i].location = location_id;

      this.updatePlayerStates(playersCopy[i]);

      this.setState({
        players: playersCopy
      });
    }
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
            this.updatePlayerStates(p);
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

  duplicateLocation(location_id) {
    console.log("Duplicate Location " + location_id);
    let locationsCopy = this.state.locations.slice();
    let i = locationsCopy.findIndex(l => l.id == location_id); // find index of location
    if(i >= 0)
    {
      let locationDuplicate = JSON.parse(JSON.stringify(locationsCopy[i]));
      this.addLocation(locationDuplicate);
    }
  }

  editLocation(location_id, edit_location) {
    console.log("Edit Location " + location_id);
    let locationsCopy = this.state.locations.slice();
    let i = locationsCopy.findIndex(l => l.id == location_id); // find index of location
    if(i >= 0)
    {
      locationsCopy[i] = edit_location;
      this.setState({
        locations: locationsCopy
      });
    }
  }

  createLocation(location) {
    return (
      <Location
        key={location.id}
        id={location.id}
        location={location}
        removeable showtitle
        players={this.state.players}
        onRemove={this.removeLocation}
        onDuplicate={this.duplicateLocation}
        onEdit={this.editLocation}
        onPlayerRemove={this.removePlayer}
        onPlayerDuplicate={this.duplicatePlayer}
        onPlayerEditProperty={this.editPlayerProperty}
        onPlayerEdit={this.editPlayer}
        onPlayerMove={this.movePlayer}
        onGearEdit={this.editGear}
        />
    );
  }

  render() {
    let locations = this.state.locations.map((l) => {return this.createLocation(l);});
    return (
      <Grid fluid>
        <SaveWidget onExport={this.exportState} onImport={this.importState} />
        <IniWidget players={this.state.players} onEditProperty={this.editPlayerProperty}/>
        <PlayerWidget
          hero
          players={this.state.players}
          onAdd={this.addPlayer}
          onRemove={this.removePlayer}
          onDuplicate={this.duplicatePlayer}
          onEditProperty={this.editPlayerProperty}
          onEdit={this.editPlayer}
          onMove={this.movePlayer}
          onGearEdit={this.editGear}
          />
        <PlayerWidget
          players={this.state.players}
          onAdd={this.addPlayer}
          onRemove={this.removePlayer}
          onDuplicate={this.duplicatePlayer}
          onEditProperty={this.editPlayerProperty}
          onEdit={this.editPlayer}
          onMove={this.movePlayer}
          onGearEdit={this.editGear}
          />
        <LocationWidget
          locations={locations}
          onAdd={this.addLocation}
          />
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(CombatProtocol);
