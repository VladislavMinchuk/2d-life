import { DynamicShapeItem } from "./dynamic-shape-item";

const CIVILIAN_SYMBOL = 'o';

export class Civilian extends DynamicShapeItem {
  symbol: string;

  constructor({ x, y }) {
    super({ x, y }, CIVILIAN_SYMBOL);
  }
}
