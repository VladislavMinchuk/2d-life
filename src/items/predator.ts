import { DynamicShapeItem } from "./dynamic-shape-item";
import { IPosition, IPredator, IRadar } from "../interface";
import { Organism } from "./organism";

const PREDATOR_SYMBOL = 'x';

export class Predator extends DynamicShapeItem {
  private radar: IRadar;
  private _currentTarget: Organism | null = null;

  constructor({ x, y }, radar: IRadar) {
    super({ x, y }, PREDATOR_SYMBOL);
    this.radar = radar;
    // this.target = Organism; // Should be implement dynamic target
  }

  get currentTarget(): Organism {
    return this._currentTarget;
  }

  override get nextMove(): IPosition {
    // Set center radar positoin based on Predator position on field
    this.radar.setOutsidePositionOwner({ x: this.x, y: this.y });
    // Set radar around with Organism around
    this.radar.updateRadar();
    // Find random move
    if (!this.radar.organismsAround.length) return this.getNextRandomMove();
    // Find move by Radar
    return this.findNextMoveByRadar();
  }

  override move(position: IPosition) {
    // Reset current target
    this._currentTarget = null; 
    super.move(position);
  }

  getNextRandomMove(): IPosition {
    const index = Math.floor(Math.random() * this.radar.availableMoves.length);
    return this.radar.availableMoves[index];
  }

  findNextMoveByRadar(): IPosition {
    let position = { x: 0, y: 0 };
    let target: Organism;

    for (let index = 0; index < this.radar.organismsAround.length; index++) {
      const outsideItem = this.radar.organismsAround[index];
      const distanceByX = Math.abs(outsideItem.x - this.x);
      const distanceByY = Math.abs(outsideItem.y - this.y);

      if (distanceByX < 2 && distanceByY < 2) { // If target is near
        target = outsideItem; break;
      }
      
      target = outsideItem;
    }

    // Set current target
    this._currentTarget = target;

    position.x = target.x < this.x ? this.x - 1 :
                 target.x > this.x ? this.x + 1 : this.x;

    position.y = target.y < this.y ? this.y - 1 :
                 target.y > this.y ? this.y + 1 : this.y;

    console.log(target.x, target.y);
    console.log(position);
    

    return position;
  }
}