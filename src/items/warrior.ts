import { DynamicShapeItem } from "./dynamic-shape-item";
import { IDynamicShapeItem, IPosition, IWarrior, IWarriorRadar } from "../interface";

const WARRIOR_SYMBOL = 'x';

export class Warrior extends DynamicShapeItem implements IWarrior {
  radar: IWarriorRadar;
  private _currentTarget: IDynamicShapeItem; // Should be the same like in WarriorrRadar

  constructor({ x, y }, radar: IWarriorRadar) {
    super({ x, y }, WARRIOR_SYMBOL);
    this.radar = radar;
  }

  get currentTarget(): IDynamicShapeItem {
    return this._currentTarget;
  }

  override get nextMove(): IPosition {
    // Set center radar positoin based on Warrior position on field
    this.radar.setOutsidePositionOwner({ x: this.x, y: this.y });
    // Set radar around with Civilian around
    this.radar.updateRadar();



    // Find random move
    if (!this.radar.hasTargetAround) return this.radar.nextRandomMove;
    // If warrior has target around
    const target = this.radar.randomTarget; // Get target
    this._currentTarget = target;
    // The move found by Radar
    return target.position;
  }

  override move(position: IPosition) {
    // Reset current target
    this._currentTarget = null; 
    super.move(position);
  }
}