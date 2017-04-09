const hero = {
  hero: 1,
  location: 0,
  name: "Hero",
  le: {start: 30},
  ini: {start: 10},
  dodge: {start: 10},
  mage: false,
  ae: {
    start: 30
  },
  priest: false,
  ke: {
    start: 30
  },
  gear: [
    {
      type: "weapon",
      name: "Streitaxt",
      at: {start: 12},
      pa: {start: 8},
      grundschaden: "1W6",
      bonus: "+4",
      rw: "mittel"
    },
    {
      type: "armor",
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
  le: {start: 30},
  ini: {start: 10},
  dodge: {start: 10},
  mage: false,
  ae: {
    start: 30
  },
  priest: false,
  ke: {
    start: 30
  },
  gear: [
    {
      type: "weapon",
      name: "Knüppel",
      at: {start: 10},
      pa: {start: 8},
      grundschaden: "1W6",
      bonus: "+2",
      rw: "mittel"
    },
    {
      type: "armor",
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


