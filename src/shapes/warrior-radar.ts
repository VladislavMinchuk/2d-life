import { IDynamicShapeItem, IPosition, IWarriorRadar, IShape, IShapeItem } from "../interface";
import { DynamicShapeItem } from "../items/dynamic-shape-item";
import { Civilian } from "../items/civilian";
import { Radar } from "./radar";
import { ShapeItem } from "../items/shape-item";

const defaultTargets = [Civilian]; // CONSTANT

export class WarriorRadar extends Radar implements IWarriorRadar {
  private _targetsAround: IDynamicShapeItem[];
  private _targets: any[]; // Array of target Classes

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
  
  // Recursive function should find a near position
  get nextRandomMove(): IPosition {
    const index = Math.floor(Math.random() * super.availableMoves.length);
    const nextMove = super.availableMoves[index];

    if (this.isNearPosition(nextMove)) return nextMove;
    this.nextRandomMove;
  }

  get hasTargetAround(): boolean {
    return !!this._targetsAround.length;
  }

  private addTargetAround(): void {
    super.getShapeModel()
      // Flatten array [ [Item, Item], [Item, Item] ... ] => [Item, Item, Item ...]
      .reduce((acc, currentValue) => ([...acc, ...currentValue]), [])
      .map((item) => {if (item instanceof ShapeItem) return item;})
      .filter((item) => item instanceof DynamicShapeItem)
      .forEach((item) => {
        // Find item by _targets array
        if (this.getCorrectTarget(item)) {
          this._targetsAround.push(super.getItemFromMap(item.position));
        }
      });
  }

  private isNearPosition(position: IPosition) {
    const distanceX = Math.abs(this.outsidePositionOwner.x - position.x);
    const distanceY = Math.abs(this.outsidePositionOwner.y - position.y);
    // Distance should be less than 1
    return distanceX < 2 && distanceY < 2 && this.outsideMap.isSpace(position);
  }

  private getCorrectTarget(item: IShapeItem) {
    return this._targets.find(t => item instanceof t);
  }

  private resetRadarState() {
    this._targetsAround = [];
  }

  override updateRadar() {
    this.resetRadarState(); // reset targets
    super.updateRadar();    // Update rader map
    this.addTargetAround(); // Add targets based on '_targets' field
  }
}