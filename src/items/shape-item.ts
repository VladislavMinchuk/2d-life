import { IShapeItem } from "../interface";

export class ShapeItem implements IShapeItem {
  x: number;
  y: number;
  symbol: string;

  constructor({ x, y }, symbol) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  toString() {
    return this.symbol;
  }
}
