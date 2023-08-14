import { Shape } from "./shape";
import { IPosition, IRadar, IShape, IShapeSize } from "../interface";

const defaultRadarSize = { width: 3, height: 3 }; // CONSTANT
const radarShapeSymbol = '\\';                    // CONSTANT
const centerMark = 'c';                           // CONSTANT

export class Radar extends Shape implements IRadar {
  protected _size: IShapeSize;
  protected centerMark: string;
  protected outsidePositionOwner: IPosition;
  protected outsideMap: IShape;
  protected _availableMoves: IPosition[];
  
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
    return {
              x: Math.ceil( this.getShapeSize().width / 2 ),
              y: Math.ceil( this.getShapeSize().height / 2 )
            };
  }

  get nextRandomMove(): IPosition {
    const index = Math.floor(Math.random() * this._availableMoves.length);
    return this._availableMoves[index];
  }

  get availableMoves(): IPosition[] {
    return this._availableMoves;
  }

  set size(size: IShapeSize) { this._size = size; }

  protected setCenterMarker(mark: string) {
    this.insertItem(this.radarCenter, mark);
  }

  protected resetAvailableMoves() {
    this._availableMoves = [];
  }

  protected getItemFromMap(outsidePositioni: IPosition) {
    return this.outsideMap.getItemByPosition(outsidePositioni);
  }

  setOutsidePositionOwner(outsidePositionOwner: IPosition) {
    this.outsidePositionOwner = outsidePositionOwner;
  }

  updateRadar() {
    this.resetAvailableMoves(); // Reset radar state

    const { width, height } = this._size;
    // Position on the Map
    const { x: ownerX, y: ownerY } = this.outsidePositionOwner;
    // Start positions on the Map (top left corrner based on Owner positoin)
    // for loop iteration (FROM top left TO right bottom on the Map)
    const outsideStartX = ownerX - (this.radarCenter.x - 1);
    const outsideStartY = ownerY - (this.radarCenter.y - 1);

    for (let indexY = 0; indexY < height; indexY++) {
      if (outsideStartY + indexY < 0) continue; // if current iteratoin is outside of the Map
      
      for (let indexX = 0; indexX < width; indexX++) {
        if (outsideStartX + indexX < 0) continue; // if current iteratoin is outside of the Map

        // Position on the Map
        const outsideLocalPos = { x: outsideStartX + indexX, y: outsideStartY + indexY };
        // Position on the Radar
        const radarPosition = { x: indexX + 1, y: indexY + 1 };
        // Get item from the Map
        const outsideItem = this.getItemFromMap(outsideLocalPos);

        if (outsideLocalPos.x > this.outsideMap.width || outsideLocalPos.y > this.outsideMap.height) {
          // Insert Radar border (radarShapeSymbol) 
          this.insertItem(radarPosition, radarShapeSymbol);
          continue;
        }
        // Skip if found the Owner on the Map
        if (outsideLocalPos.x === ownerX && outsideLocalPos.y === ownerY) {
          continue;
        }
        // Insert item into Radar
        this.insertItem(radarPosition, outsideItem);
        // Set available moves (if current position is space add position on the Map to available moves)
        if (super.isSpace(radarPosition)) this._availableMoves.push(outsideLocalPos);
      }
    }

    this.setCenterMarker(this.centerMark);
  }
}
