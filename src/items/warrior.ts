import { DynamicShapeItem } from "./dynamic-shape-item";
import { IDynamicItemWithRadar, IDynamicShapeItem, IPosition, IShapeItem, IWarriorRadar } from "../interface";

const WARRIOR_SYMBOL = 'x';

export class Warrior extends DynamicShapeItem implements IDynamicItemWithRadar {
  radar: IWarriorRadar;
  private _currentTarget: IDynamicShapeItem; // Should be the same like in WarriorrRadar

  constructor({ x, y }, radar: IWarriorRadar) {
    super({ x, y }, WARRIOR_SYMBOL);
    this.radar = radar;
  }

  get currentTarget(): IDynamicShapeItem {
    return this._currentTarget;
  }
  
  set currentTarget(target: IDynamicShapeItem) {
    this._currentTarget = target;
  }

  get radarModel(): (IShapeItem | string)[][] {
    return this.radar.radarModel;
  }

  override get nextMove(): IPosition {
    // Set center radar positoin based on Warrior position on field
    this.radar.setOutsidePositionOwner({ x: this.x, y: this.y });
    // Set radar around with Civilian around
    this.radar.updateRadar();
    // Find random move
    if (!this.radar.hasTargetAround) return this.radar.nextRandomMove;
    const target = this.radar.randomTarget; // Get target
    this.currentTarget = target;
    // Find move by Radar
    return target.getPosition();
  }

  override move(position: IPosition) {
    // Reset current target
    this.currentTarget = null; 
    super.move(position);
  }
}