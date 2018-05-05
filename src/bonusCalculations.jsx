export function getAtBoni(states, rw) {
  let bonus = [];
  if(states !== undefined) {
    for(let s of states) {
      if (s.name === "Schmerz")
        bonus.push({name: "Schmerz", bonus: -1});
      else if (s.name === "Behinderung")
        bonus.push({name: "Behinderung", bonus: -1});
      else if (s.name === "Eingeengt") {
        if (rw === "kurz")   bonus.push({name: "Eingeengt", bonus: 0});
        if (rw === "mittel") bonus.push({name: "Eingeengt", bonus: -4});
        if (rw === "lang")   bonus.push({name: "Eingeengt", bonus: -8});
      }
      else if (s.name === "Dunkelheit") {
        // todo add real rules
        bonus.push({name: "Dunkelheit", bonus: -s.stufe});
      }
    }
  }
  return bonus;
}

export function getPaBoni(states, rw) {
  let bonus = [];
  if(states !== undefined) {
    for(let s of states) {
      if (s.name === "Schmerz")
        bonus.push({name: "Schmerz", bonus: -1});
      else if (s.name === "Behinderung")
        bonus.push({name: "Behinderung", bonus: -1});
      else if (s.name === "Eingeengt") {
        if (rw === "kurz") bonus.push({name: "Eingeengt", bonus: 0});
        if (rw === "mittel") bonus.push({name: "Eingeengt", bonus: -4});
        if (rw === "lang") bonus.push({name: "Eingeengt", bonus: -8});
      }
      else if (s.name === "Dunkelheit") {
        // todo add real rules
        bonus.push({name: "Dunkelheit", bonus: -s.stufe});
      }
    }
  }
  return bonus;
}

export function getIniBoni(states) {
  let bonus = [];
  for(let s of states) {
    if (s.name === "Behinderung")
      bonus.push({name: "Behinderung", bonus: -1});
  }
  return bonus;
}
