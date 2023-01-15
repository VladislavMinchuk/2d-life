import { Shape } from "./shape";
import { IPosition, IRadar, IShape, IShapeItem, IShapeSize } from "../interface";
import { stringify } from "../utils";

const defaultRadarSize = { width: 3, height: 3 }; // CONSTANT
const radarShapeSymbol = '\\';                    // CONSTANT
const centerMark = 'c';                           // CONSTANT

export class Radar extends Shape implements IRadar {
  protected _size: IShapeSize;
  protected centerMark: string;
  protected outsidePositionOwner: IPosition;
  protected outsideMap: IShape;
  private _availableMoves: IPosition[];

  constructor(outsidePositionOwner: IPosition, outsideMap: IShape) {
    super(defaultRadarSize, radarShapeSymbol); // call Shape's constructor

    this._size = defaultRadarSize;
    this._availableMoves = [];
    this.centerMark = centerMark;
    this.outsidePositionOwner = outsidePositionOwner;
    this.outsideMap = outsideMap;

    this.setCenterMarker(this.centerMark);
    this.updateRadar();
  }

  get radarCenter(): IPosition {
    return { x: Math.ceil( this.getShapeSize().width / 2 ),
             y: Math.ceil( this.getShapeSize().height / 2 ) };
  }

  get radarModel(): (IShapeItem | string)[][] { return super.getShapeModel(); }

  get nextRandomMove(): IPosition {
    const index = Math.floor(Math.random() * this._availableMoves.length);
    return this._availableMoves[index];
  }

  set size(size: IShapeSize) { this._size = size; }

  protected setCenterMarker(mark: string) {
    this.insertItem(this.radarCenter, mark);
  }

  protected resetRadarState() {
    this._availableMoves = [];
  }

  private addAvailableMove(position: IPosition) {
    const distanceX = Math.abs(this.outsidePositionOwner.x - position.x);
    const distanceY = Math.abs(this.outsidePositionOwner.y - position.y);

    if (distanceX < 2 && distanceY < 2 && this.outsideMap.isSpace(position)) this._availableMoves.push(position);
  }

  public setOutsidePositionOwner(outsidePositionOwner: IPosition) {
    this.outsidePositionOwner = outsidePositionOwner;
  }

  public isAvailableMove(position: IPosition): boolean {
    return !!this._availableMoves.find(p => stringify(p) === stringify(position));
  }

  public showShape() { super.showShape(); }

  // iterationCb - Unnecessary callback function, call on each iteration
  // Don't forget to save context of callback
  public updateRadar(iterationCb?: Function) {
    const { width, height } = this._size;
    const { x: ownerX, y: ownerY } = this.outsidePositionOwner;
    const outsideStartX = ownerX - (this.radarCenter.x - 1);
    const outsideStartY = ownerY - (this.radarCenter.y - 1);

    for (let indexY = 0; indexY < height; indexY++) {
      if (outsideStartY + indexY < 0) continue;
      
      for (let indexX = 0; indexX < width; indexX++) {
        if (outsideStartX + indexX < 0) continue;

        const outsideLocalPos = { x: outsideStartX + indexX, y: outsideStartY + indexY };
        const radarPosition = { x: indexX + 1, y: indexY + 1 };
        const outsideItem = this.outsideMap.getItemByPosition(outsideLocalPos);

        if (outsideLocalPos.x > this.outsideMap.width || outsideLocalPos.y > this.outsideMap.height) {
          this.insertItem(radarPosition, radarShapeSymbol); // Insert shape symbol
          continue;
        }

        if (outsideLocalPos.x === ownerX && outsideLocalPos.y === ownerY) continue;

        this.insertItem(radarPosition, outsideItem); // Insert item into Radar
        this.addAvailableMove(outsideLocalPos); // Add available move around
        // Callback function
        if (iterationCb) iterationCb(outsideItem, outsideLocalPos, radarPosition);
      }
    }

    this.setCenterMarker(this.centerMark);
  }
}
