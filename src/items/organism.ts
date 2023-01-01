import { DynamicShapeItem } from "./dynamic-shape-item";

const ORGANISM_SYMBOL = 'o';

export class Organism extends DynamicShapeItem {
  symbol: string;

  constructor({ x, y }) {
    super({ x, y }, ORGANISM_SYMBOL);
  }
}
