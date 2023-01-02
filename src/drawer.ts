import { IDrawer, IShape, IDynamicShapeItem, IPosition, IStepDynamicService } from "./interface";

export class Drawer implements IDrawer {
  shapeInstance: IShape;
  shapeItems: IDynamicShapeItem[];
  dynamicItemsService: IStepDynamicService;

  constructor(options: {
    shape: IShape,
    dynamic: { items: IDynamicShapeItem[], handler: IStepDynamicService }
  }) {
    this.shapeInstance = options.shape;
    this.shapeItems = options.dynamic.items;
    this.dynamicItemsService = options.dynamic.handler;
  }

  private insertAllItemsIntoShape(): IShape {
    this.shapeItems.forEach((element) => {
      this.shapeInstance
        .insertSpace(element.prevStep)
        .insertItem(element.getPosition(), element);
    });

    return this.shapeInstance;
  }

  private insertSinglItem(element: IDynamicShapeItem): IShape {
    return this.shapeInstance
      .insertSpace(element.prevStep)
      .insertItem(element.getPosition(), element);
  }
  
  public show() {
    this.clearConsoleAndScrollbackBuffer();
    this.insertAllItemsIntoShape().showShape();
  }

  public step() {
    let index = 0;
      
    const interval = setInterval(() => {
      let element = this.shapeItems[index];
      if (!element) return index = 0;

      if (element.isDead) {
        return this.shapeItems = this.dynamicItemsService.getAliveItems(this.shapeItems);
      }

      this.clearConsoleAndScrollbackBuffer();

      // Get nextMove fron Handler
      let nextMove: IPosition = this.dynamicItemsService.getNextMoveForShapeItem(element, this.shapeInstance);
      element.move(nextMove);
      
      this.insertSinglItem(element).showShape();
      index++;
    }, 1000);
  }

  public clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
    console.clear();
  }
}
