import { IDynamicShapeItem, IPosition, IWarriorRadar, IShape, IShapeItem } from "../interface";
import { DynamicShapeItem } from "../items/dynamic-shape-item";
import { Civilian } from "../items/civilian";
import { Radar } from "./radar";

const defaultTargets = [Civilian]; // CONSTANT

export class WarriorRadar extends Radar implements IWarriorRadar {
  private _targetsAround: IDynamicShapeItem[];
  private _targets: { name: string }[]; // Array of target Classes

  constructor(outsidePositionOwner: IPosition, outsideMap: IShape) {
    super(outsidePositionOwner, outsideMap);

    this._targets = defaultTargets;
    this._targetsAround = [];
  }
  // Set names of target
  set targets(targetsArr: { name: string }[]) { this._targets = targetsArr; }

  get randomTarget(): IDynamicShapeItem {
    const index = Math.floor(Math.random() * this._targetsAround.length);
    return this._targetsAround[index];
  }
  
  get hasTargetAround(): boolean {
    return !!this._targetsAround.length;
  }

  protected resetRadarState() {
    super.resetRadarState();
    this._targetsAround = [];
  }

  private addTargetAround(target: IShapeItem) {
    if (target instanceof DynamicShapeItem && this.isAvailableTarget(target)) {
      this._targetsAround.push(target);
    }
  }

  // Should be arrow function for saving context (this), because function will be called inside another context
  private updateRadarCb = (outsideItem: IShapeItem, outsideLocalPos: IPosition, radarPosition: IPosition) => {
    this.addTargetAround(outsideItem);
  }

  override updateRadar() {
    this.resetRadarState(); // reset targets and moves
    super.updateRadar(this.updateRadarCb);
  }

  public isAvailableTarget(target: IShapeItem): boolean {
    return !!this._targets.find(t => t.name === target.constructor.name);
  }
}