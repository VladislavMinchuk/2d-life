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
      if (!element) {
        index = 0;
        element = this.shapeItems[index];
      }

      if (element.isDead) {
        console.log(element.isDead);
        return this.shapeItems = this.dynamicHandler.getAliveItems(this.shapeItems);
      }

      // this.clearConsoleAndScrollbackBuffer();

      // Get nextMove fron Handler
      let nextMove: IPosition = this.dynamicHandler.getNextMoveForShapeItem(element, this.shapeInstance);
      
      console.log(element.constructor.name, index, 'next: ' + JSON.stringify(nextMove), 'prev: ' + JSON.stringify(element.prevStep));
      
      element.move(nextMove);

      this.insertSinglItem(element).showShape();

      index++;
    }, 1000);



      
      

    // this.shapeItems = this.shapeItems.filter((element) => {
    //   if (element.isDead) {
    //     // Set empty space instead of dead element
    //     this.shapeInstance.insertSpace(element.getPosition());
    //     return false; // Remove dead items
    //   }

    //   // Get nextMove fron Handler
    //   let nextMove: IPosition = this.dynamicHandler.getNextMoveForShapeItem(element, this.shapeInstance);
    //   element.move(nextMove);
      
    //   return true;
    // });
  }

  public clearConsoleAndScrollbackBuffer() {
    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
    console.clear();
  }
}
