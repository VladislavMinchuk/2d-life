import { IDynamicShapeItem, IPosition } from "../interface";
import { ShapeItem } from "./shape-item";

export class DynamicShapeItem extends ShapeItem implements IDynamicShapeItem {
  _prevStep: { x: number, y: number };
  _isDead: boolean;
  positionsAround: { x: number; y: number; }[];
  id: number;

  constructor({ x, y }, symbol) {
    super({ x, y }, symbol);

    this.id = Math.round(Date.now() * Math.random() * 1000); // generate unique number
    this._prevStep = { x, y };
    this.positionsAround = [];
    this.setPositionsAround();
    this._isDead = false;
  }
  
  set prevStep({ x, y }) {
    this._prevStep = { x, y };
  }
  
  get prevStep() {
    return this._prevStep;
  }
  
  set isDead(flag: boolean) {
    this._isDead = flag;
  }
  
  get isDead() {
    return this._isDead;
  }
  
  get nextMove() {
    const culcPositionsFn = [
      (a: number) => a + 1,
      (a: number) => a - 1,
      (a: number) => a,
    ];

    const indexX = Math.floor(Math.random() * culcPositionsFn.length);
    const indexY = Math.floor(Math.random() * culcPositionsFn.length);
    
    return {
      x: culcPositionsFn[indexX](this.x),
      y: culcPositionsFn[indexY](this.y)
    };
  }
  
  get around() {
    return this.positionsAround;
  }
  
  get fullAround() {
    return [
      { x: this.x,       y: this.y - 1 },   // top
      { x: this.x + 1,   y: this.y - 1 },   // top right
      { x: this.x + 1,   y: this.y },       // right
      { x: this.x + 1,   y: this.y + 1 },   // bottom right
      { x: this.x,       y: this.y + 1 },   // bottom
      { x: this.x - 1,   y: this.y + 1 },   // bottom left
      { x: this.x - 1,   y: this.y },       // left
      { x: this.x - 1,   y: this.y - 1 },   // top letf
    ];
  }

  setPositionsAround(maxBorder = 100) {
    this.positionsAround = this.fullAround
      .filter(item => item.x > 0 && item.y > 0 && item.x <= maxBorder && item.y <= maxBorder );
  }

  move({ x, y }: IPosition) {
    this.prevStep = { x: this.x, y: this.y };
    this.x = x;
    this.y = y;
  }
}