import { Shape } from "./shape";
import { IPosition, IRadar, IShape, IShapeItem, IShapeSize } from "../interface";

const defaultRadarSize = { width: 3, height: 3 }; // CONSTANT
const radarShapeSymbol = '\\';                    // CONSTANT
const centerMark = 'c';                           // CONSTANT

export class Radar extends Shape implements IRadar {
  protected _size: IShapeSize;
  protected centerMark: string;
  protected outsidePositionOwner: IPosition;
  protected outsideMap: IShape;

  constructor(outsidePositionOwner: IPosition, outsideMap: IShape) {
    super(defaultRadarSize, radarShapeSymbol); // call Shape's constructor
    this._size = defaultRadarSize;
    this.centerMark = centerMark;
    this.outsidePositionOwner = outsidePositionOwner;
    this.outsideMap = outsideMap;

    this.setCenterMarker(this.centerMark);
    this.updateRadar();
  }

  get radarCenter(): IPosition {
    return {
              x: Math.ceil( this.getShapeSize().width / 2 ),
              y: Math.ceil( this.getShapeSize().height / 2 )
            };
  }

  get radarModel(): (IShapeItem | string)[][] {
    return super.getShapeModel();
  }

  set size(size: IShapeSize) { this._size = size; }

  protected setCenterMarker(mark: string) {
    this.insertItem(this.radarCenter, mark);
  }

  isSpace(position: IPosition): boolean {
    return this.outsideMap.isSpace(position);
  }

  setOutsidePositionOwner(outsidePositionOwner: IPosition) {
    this.outsidePositionOwner = outsidePositionOwner;
  }

  showShape() { super.showShape(); }

  // iterationCb - unnecessary callback function, call on each iteratioin
  // Don't forget to save context of callback
  updateRadar(iterationCb?: Function) {
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

        if (outsideLocalPos.x === ownerX && outsideLocalPos.y === ownerY) {
          continue;
        }
        // Insert item into Radar
        this.insertItem(radarPosition, outsideItem);
        // Callback function
        if (iterationCb) iterationCb(outsideItem, outsideLocalPos, radarPosition);
      }
    }

    this.setCenterMarker(this.centerMark);
  }
}
