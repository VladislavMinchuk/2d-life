import { DynamicShapeItem } from "./dynamic-shape-item";
import { IDynamicShapeItem, IPosition, IPredator, IPredatorRadar } from "../interface";

const PREDATOR_SYMBOL = 'x';

export class Predator extends DynamicShapeItem implements IPredator {
  radar: IPredatorRadar;
  private _currentTarget: IDynamicShapeItem; // Should be the same like in PredatorRadar

  constructor({ x, y }, radar: IPredatorRadar) {
    super({ x, y }, PREDATOR_SYMBOL);
    this.radar = radar;
  }

  get currentTarget(): IDynamicShapeItem {
    return this._currentTarget;
  }

  override get nextMove(): IPosition {
    // Set center radar positoin based on Predator position on field
    this.radar.setOutsidePositionOwner({ x: this.x, y: this.y });
    // Set radar around with Organism around
    this.radar.updateRadar();
    // Find random move
    if (!this.radar.hasTargetAround) return this.radar.nextRandomMove;
    const target = this.radar.randomTarget; // Get target
    this._currentTarget = target;
    // Find move by Radar
    return target.getPosition();
  }

  override move(position: IPosition) {
    // Reset current target
    this._currentTarget = null; 
    super.move(position);
  }
}