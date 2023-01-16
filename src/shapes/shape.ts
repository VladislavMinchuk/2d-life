import DecorItemFactory from "../factories/decor-item-factory";
import { IShape, IShapeItem } from "../interface";

// Depends on factory
const decorItemFactory = new DecorItemFactory();

export class Shape implements IShape {
  width: number;
  height: number;
  borderSymbol: string;
  spaceSymbol: string;
  shapeModel: IShapeItem[][];
  
  constructor(size: { width: number, height: number }, borderSymbol?: string) {
    this.width = size.width;
    this.height = size.height;
    this.borderSymbol = borderSymbol || '#';
    this.spaceSymbol = ' ';
    this.shapeModel = [];

    this.createShape();
  }

  createShape() {
    const widthWithBorder = this.width + 2;
    const heightWithBorder = this.height + 2;

    for (let index = 0; index < heightWithBorder; index++) {
      this.shapeModel.push(new Array(widthWithBorder));
      
      if (index === 0 || index + 1 === heightWithBorder) {
        this.shapeModel[index].fill(decorItemFactory.createBorder({ x: 0, y: index }));
        continue;
      }
      
      for (let indexInner = 0; indexInner < widthWithBorder; indexInner++) {
        if (indexInner === 0 || indexInner + 1 === widthWithBorder) {
          this.shapeModel[index][indexInner] = decorItemFactory.createBorder({ x: indexInner, y: index });
          continue;
        }
        // Create Space decor item
        this.shapeModel[index][indexInner] = decorItemFactory.createSpace({ x: indexInner, y: index });
      }
    }

    return this;
  }

  insertItem({ x, y }, item: IShapeItem) {
    if (this.isPositionInsideShape({ x, y })) this.shapeModel[y][x] = item;;
    return this;
  }
  
  insertSpace({ x, y }) {
    this.shapeModel[y][x] = decorItemFactory.createSpace({ x, y });
    return this;
  }

  isSpace({ x, y }) {
    return this.getItemByPosition({ x, y }).symbol === this.spaceSymbol;
  }
  
  getShapeModel() {
    return this.shapeModel;
  }
  
  getShapeSize() {
    return { width: this.width, height: this.height };
  }

  getItemByPosition({ x, y }): IShapeItem {
    return this.shapeModel[y][x];
  }

  isPositionInsideShape({ x, y }) {
    return (x > 0 && y > 0) && (x <= this.width && y <= this.height);
  }

  showShape() {
    this.getShapeModel().forEach((element) => console.log(element.join(' ')));
  }
}
