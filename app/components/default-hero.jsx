const hero = {
  hero: 1,
  location: 0,
  name: "Hero",
  lep: {start: 30},
  ini: {start: 10},
  mage: false,
  asp: {
    start: 30
  },
  priest: false,
  kap: {
    start: 30
  },
  weapons: [
    {
      name: "Streitaxt",
      at: {start: 12},
      pa: {start: 8},
      grundschaden: "1W6",
      bonus: "+4",
      rw: "mittel"
    }
  ],
  armors: [
    {
      name: "Keine",
      rs: {start: 0},
      be: {start: 0}
    }
  ],
  states: []
};

const enemy = {
  hero: 0,
  location: 1,
  name: "Ork",
  lep: {start: 30},
  ini: {start: 10},
  mage: false,
  asp: {
    start: 30
  },
  priest: false,
  kap: {
    start: 30
  },
  weapons: [
    {
      name: "Streitaxt",
      at: {start: 12},
      pa: {start: 8},
      grundschaden: "1W6",
      bonus: "+4",
      rw: "mittel"
    }
  ],
  armors: [
    {
      name: "Keine",
      rs: {start: 0},
      be: {start: 0}
    }
  ],
  states: []
};

export function newHero() {
  return JSON.parse(JSON.stringify( hero ));
}

export function newEnemy() {
  return JSON.parse(JSON.stringify( enemy ));
}


