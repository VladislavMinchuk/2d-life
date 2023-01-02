import { Shape } from "./shape";
import { IDynamicShapeItem, IPosition, IRadar, IShape, IShapeSize } from "../interface";
import { Organism } from "../items/organism";

const defaultRadarSize = { width: 3, height: 3 };
const radarShapeSymbol = '\\';
const centerMark = 'c';

export class Radar extends Shape implements IRadar {
  size: IShapeSize;
  private centerMark: string;
  private outsidePositionOwner: IPosition;
  private outsideMap: IShape;
  private _organismsAround: Organism[];
  private _availableMoves: IPosition[];

  constructor(outsidePositionOwner: IPosition, outsideMap: IShape) {
    super(defaultRadarSize, radarShapeSymbol); // call Shaper's constructor
    this.size = defaultRadarSize;
    this.centerMark = centerMark;
    this.outsidePositionOwner = outsidePositionOwner;
    this.outsideMap = outsideMap;
    this._organismsAround = [];
    this._availableMoves = [];

    this.setCenterMarker(this.centerMark);
    this.updateRadar();
  }

  get radarCenter(): IPosition {
    return {
              x: Math.ceil( this.getShapeSize().width / 2 ),
              y: Math.ceil( this.getShapeSize().height / 2 )
            };
  }

  get organismsAround(): IDynamicShapeItem[] {
    return this._organismsAround;
  }

  get availableMoves(): IPosition[] {
    return this._availableMoves;
  }

  private addOrganismAround(item: Organism) {
    this.organismsAround.push(item);
  }

  private setCenterMarker(mark: string) {
    this.insertItem(this.radarCenter, mark);
  }

  private addAvailableMove(position: IPosition) {
    const distanceX = Math.abs(this.outsidePositionOwner.x - position.x);
    const distanceY = Math.abs(this.outsidePositionOwner.y - position.y);

    if (distanceX < 2 && distanceY < 2 && this.outsideMap.isSpace(position)) this._availableMoves.push(position);
  }

  private resetAroundState() {
    this._organismsAround = [];
    this._availableMoves = [];
  }

  isSpace(position: IPosition): boolean {
    return this.outsideMap.isSpace(position);
  }

  setOutsidePositionOwner(outsidePositionOwner: IPosition) {
    this.outsidePositionOwner = outsidePositionOwner;
  }

  updateRadar() {
    this.resetAroundState();
    const outsideStartX = this.outsidePositionOwner.x - (this.radarCenter.x - 1);
    const outsideStartY = this.outsidePositionOwner.y - (this.radarCenter.y - 1);
    const maxIterationsY = this.size.height;
    const maxIterationsX = this.size.width;


    for (let indexY = 0; indexY <= maxIterationsY; indexY++) {
      if (outsideStartY + indexY < 0) continue;
      
      for (let indexX = 0; indexX <= maxIterationsX; indexX++) {
        if (outsideStartX + indexX < 0) continue;

        const outsideLocalPos = { x: outsideStartX + indexX, y: outsideStartY + indexY };

        if (outsideLocalPos.x > this.outsideMap.width || outsideLocalPos.y > this.outsideMap.height) {
          this.insertItem({ x: indexX + 1, y: indexY + 1 }, radarShapeSymbol);
          continue;
        }
        
        const outsideItem = this.outsideMap.getItemByPosition(outsideLocalPos);

        if (
          outsideLocalPos.x === this.outsidePositionOwner.x &&
          outsideLocalPos.y === this.outsidePositionOwner.y
        ) {
          continue;
        }
        // Add only alive Organisms
        if (outsideItem instanceof Organism && !outsideItem.isDead) this.addOrganismAround(outsideItem);
        
        this.insertItem({ x: indexX + 1, y: indexY + 1 }, outsideItem);
        this.addAvailableMove(outsideLocalPos);
      }
    }

    this.setCenterMarker(this.centerMark);
  }
}
