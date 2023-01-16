import { IPosition, IShape } from "../interface";
import { IDynamicItemsFactory } from "../interface/factories";
import { Warrior } from "../items/warrior";
import { WarriorRadar } from "../shapes/warrior-radar";

export default class WarriorFactory implements IDynamicItemsFactory {
  outsideMap: IShape;

  constructor(outsideMap: IShape) {
    this.outsideMap = outsideMap;
  }

  create(position: IPosition): Warrior {
    return new Warrior(position, (new WarriorRadar(position, this.outsideMap)))
  }

  createArray(positions: IPosition[]): Warrior[] {
    return positions.map((pos) => new Warrior(pos, new WarriorRadar(pos, this.outsideMap)));
  }
}