import { IDrawer, IShape, IDynamicShapeItem, IPosition, IStepDynamicHandler } from "./interface";

export class Drawer implements IDrawer {
  shapeInstance: IShape;
  shapeItems: IDynamicShapeItem[];
  dynamicHandler: IStepDynamicHandler;

  constructor(options: {
    shape: IShape,
    dynamic: { items: IDynamicShapeItem[], handler: IStepDynamicHandler }
  }) {
    this.shapeInstance = options.shape;
    this.shapeItems = options.dynamic.items;
    this.dynamicHandler = options.dynamic.handler;
  }

  private insertAllItemsIntoShape(): IShape {
    this.shapeItems.forEach((element) => {
      this.shapeInstance
        .insertSpace(element.prevStep)
        .insertItem(element.getPosition(), element);
    });

    return this.shapeInstance;
  }
  
  public show() {
    this.clearConsoleAndScrollbackBuffer();
    this.insertAllItemsIntoShape().showShape();
  }

  public step() {
    this.shapeItems = this.shapeItems.filter((element) => {
      if (element.isDead) {
        // Set empty space instead of dead element
        this.shapeInstance.insertSpace(element.getPosition());
        return false; // Remove dead items
      }

      // Get nextMove fron Handler
      let nextMove: IPosition = this.dynamicHandler.getNextMoveForShapeItem(element, this.shapeInstance);
      element.move(nextMove);
      return true;
    });
  }

  public clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
    console.clear();
  }
}
