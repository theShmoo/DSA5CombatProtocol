const hero = {
  hero: 1,
  location: 0,
  name: "Hero",
  ini: {basis: 10},
  lp: {max: 30},
  asp: {
    mage: false,
    max: 30
  },
  weapons: [
    {
      name: "Axt",
      at: 12,
      pa: 8,
      rw: "mittel"
    }
  ],
  armors: [
    {
      name: "Keine",
      rs: 0,
      be: 0
    }
  ]
};

const enemy = {
  hero: 0,
  location: 1,
  name: "Ork",
  lp: {max: 30},
  ini: {basis: 10},
  asp: {
    mage: false,
    max: 30
  },
  weapons: [
    {
      name: "Axt",
      at: 12,
      pa: 8,
      rw: "mittel"
    }
  ],
  armors: [
    {
      name: "Keine",
      rs: 0,
      be: 0
    }
  ]
};

export function newHero() {
  return JSON.parse(JSON.stringify( hero ));
}

export function newEnemy() {
  return JSON.parse(JSON.stringify( enemy ));
}


