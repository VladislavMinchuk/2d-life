import { IDynamicShapeItem, IPosition } from "../interface";
import IDynamicItemsFactory from "../interface/dynamic-items-factory";
import { Organism } from "../items/organism";

export default class OrganismFactory implements IDynamicItemsFactory {
  create(position: IPosition): IDynamicShapeItem {
    return new Organism(position)
  }

  createArray(positions: IPosition[]): IDynamicShapeItem[] {
    return positions.map((pos) => new Organism(pos));
  }
}