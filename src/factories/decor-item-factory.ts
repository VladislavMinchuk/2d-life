import { IDynamicShapeItem, IPosition, IShapeItem } from "../interface";
import { IDecorItemsFactory } from "../interface/factories";
import { ShapeItem } from "../items/shape-item";

const spaceSymbol = ' '; // CONST
const borderSymbol = '#';

export default class DecorItemFactory implements IDecorItemsFactory {
  createSpace(position: IPosition): IShapeItem {
    return new ShapeItem(position, spaceSymbol);
  }

  createBorder(position: IPosition): IShapeItem {
    return new ShapeItem(position, borderSymbol);
  }
}