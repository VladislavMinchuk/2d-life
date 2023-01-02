import { IPosition, IShape } from "../interface";
import IDynamicItemsFactory from "../interface/dynamic-items-factory";
import { Predator } from "../items/predator";
import { PredatorRadar } from "../shapes/predator-radar";

export default class PredatorFactory implements IDynamicItemsFactory {
  outsideMap: IShape;

  constructor(outsideMap: IShape) {
    this.outsideMap = outsideMap;
  }

  create(position: IPosition): Predator {
    return new Predator(position, (new PredatorRadar(position, this.outsideMap)))
  }

  createArray(positions: IPosition[]): Predator[] {
    return positions.map((pos) => new Predator(pos, new PredatorRadar(pos, this.outsideMap)));
  }
}