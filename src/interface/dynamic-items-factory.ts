import { IDynamicShapeItem, IPosition } from ".";

export default interface IDynamicItemsFactory {
  create(position: IPosition): IDynamicShapeItem
  createArray(positions: IPosition[]): IDynamicShapeItem[]
}