import { IShapeItem } from "../interface";

export class ShapeItem implements IShapeItem {
  x: number;
  y: number;
  symbol: string;
  id: number;

  constructor({ x, y }, symbol: string) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.id = Math.round(Date.now() * Math.random() * 1000); // generate unique number
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  toString() {
    return this.symbol;
  }
}
