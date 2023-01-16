import { IDynamicShapeItem, IPosition } from ".";
import { ShapeItem } from "../items/shape-item";

export interface IDynamicItemsFactory {
  create(position: IPosition): IDynamicShapeItem
  createArray(positions: IPosition[]): IDynamicShapeItem[]
}

export interface IDecorItemsFactory {
  createBorder(position: IPosition): ShapeItem
  createSpace(position: IPosition): ShapeItem
}
