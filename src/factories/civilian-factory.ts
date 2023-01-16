import { IDynamicShapeItem, IPosition } from "../interface";
import { IDynamicItemsFactory } from "../interface/factories";
import { Civilian } from "../items/civilian";

export default class CivilianFactory implements IDynamicItemsFactory {
  create(position: IPosition): IDynamicShapeItem {
    return new Civilian(position)
  }

  createArray(positions: IPosition[]): IDynamicShapeItem[] {
    return positions.map((pos) => new Civilian(pos));
  }
}