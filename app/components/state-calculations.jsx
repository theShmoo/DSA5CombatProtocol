function getPainOfPlayer(player) {
  const {start, current} = player.le;
  const actual_le = start + ((current != null) ? current : 0);
  const stepsize = start / 4.0;
  const c = Math.ceil(actual_le/stepsize);
  let num_pain = 4-c;
  if(actual_le <= 5) num_pain++;
  for (let p = 0; p < num_pain; p++)
    player.states.push({name: "Schmerz", glyph: "tint"});
}

function getStatesByLocation(player, location) {
  if(location != null) {
    if(location.cramped) {
      player.states.push({name: "Eingeengt", glyph: "resize-small"});
    }

    if(location.darkness > 0) {
      player.states.push({name: "Dunkelheit", stufe: location.darkness, glyph: "cloud"});
    }
  }
}

function getStatesByGear(player) {
  let armors = player.gear.filter(g => g.type == "armor");
  let sum = 0;
  for (let armor of armors) {
    const {start, current} = armor.be;
    const actual_be = start + ((current != null) ? current : 0);
    sum += actual_be;
  }
  for(let b = 0; b < sum; b++) {
    player.states.push({name: "Behinderung", glyph: "scale"});
  }
}

export function calculateStates(player, location) {
  // reset states of player which are then set again
  player.states = [];

  getPainOfPlayer(player);
  getStatesByGear(player);
  getStatesByLocation(player, location);
}
