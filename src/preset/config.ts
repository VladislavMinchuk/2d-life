import { IGame } from "../interface";

export const defaultGamePreset: IGame = {
  mapSize: { width: 10, height: 10 },
  dynamicItemsPos: {
    warrior: [{ x: 2, y: 2 }, { x: 2, y: 5 }, { x: 2, y: 9 }],
    civilian: [{ x: 9, y: 2 }, { x: 9, y: 5 }, { x: 9, y: 9 }]
  }
};


export const mainSettingChoices = [
  {
    name: 'Default - Map: 10x10, 6 Dynamic items: 3 Warriors, 3 Civilians',
    value: 'default'
  },
  {
    name: 'Custom - Map size, type and count of Dynamic items',
    value: 'custom'
  }
];

export const mapSizeChoices = [
  {
    name: '10x10',
    value: 10
  },
  {
    name: '15x15',
    value: 15
  },
  {
    name: '20x20',
    value: 20
  }
];

export const dynamicItemsChoices = [
  {
    name: 'Warrior',
    value: 'warrior'
  },
  {
    name: 'Civilian',
    value: 'civilian'
  }
];