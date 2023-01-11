import { IGame } from "../interface";

export const itemsPositionsByMap = {
  small: {
    warrior: [{ x: 2, y: 2 }, { x: 2, y: 5 }, { x: 2, y: 9 }],
    civilian: [{ x: 9, y: 2 }, { x: 9, y: 5 }, { x: 9, y: 9 }]
  },
  mid: {
    warrior: [{ x: 2, y: 2 }, { x: 2, y: 5 }, { x: 2, y: 8 }, { x: 2, y: 11 }, { x: 2, y: 14 }],
    civilian: [{ x: 14, y: 2 }, { x: 14, y: 5 }, { x: 14, y: 8 }, { x: 14, y: 11 }, { x: 14, y: 14 }]
  },
  large: {
    warrior: [{ x: 3, y: 2 }, { x: 3, y: 5 }, { x: 3, y: 9 }, { x: 3, y: 12 }, { x: 3, y: 15 }, { x: 3, y: 18 }],
    civilian: [{ x: 18, y: 2 }, { x: 18, y: 5 }, { x: 18, y: 9 }, { x: 18, y: 12 }, { x: 18, y: 15 }, { x: 18, y: 18 }]
  },
};

export const mapSize = {
  small: {
    width: 10,
    height: 10,
  },
  mid: {
    width: 15,
    height: 15,
  },
  large: {
    width: 20,
    height: 20,
  },
};

export const defaultGamePreset = {
  settings: {
    mapSize: mapSize.small,
    dynamicItemsPos: {
      warrior: itemsPositionsByMap.small.warrior,
      civilian: itemsPositionsByMap.small.civilian
    }
  },
  isAutoSteps: true
};

export const mainSettingChoices = [
  {
    name: 'Default - Map: 10x10, 6 Dynamic items: 3 Warriors, 3 Civilians, Automatically steps',
    value: 'default'
  },
  {
    name: 'Custom - Map size, type and count of Dynamic items, step handler',
    value: 'custom'
  }
];

export const mapSizeChoices = [
  {
    name: 'Small map - 10x10',
    value: 'small'
  },
  {
    name: 'Mid map - 15x15',
    value: 'mid'
  },
  {
    name: 'Large map - 20x20',
    value: 'large'
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

export const stepHandleChoices = [
  {
    name: 'Handle each steps by keypress',
    value: 'keypress'
  },
  {
    name: 'Automatically steps',
    value: 'automatically'
  }
];
