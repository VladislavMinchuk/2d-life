import { Drawer } from "./drawer";
import { Shape } from "./shapes/shape";
import PredatorFactory from "./factories/predator-factory";
import OrganismFactory from "./factories/organism-factory";
import StepDynamicHandler from "./services/step-dynamic-items";
import { IDrawer, IDynamicShapeItem, IShape } from "./interface";

export default new class Game {
  constructor () {
    this._dynamicItems = [];
    this.createMainMap().createDynamicItems().createDrawer();

    return this;
  }

  private _mainMap: IShape;
  private _dynamicItems: IDynamicShapeItem[];
  private _dawer: IDrawer;

  // Static size
  private createMainMap() {
    this._mainMap = new Shape({ width: 10, height: 10});
    return this;
  }
  // Static date
  private createDynamicItems() {
    this.checkMap();

    const predatorFactory = new PredatorFactory(this._mainMap);
    const orgFact = new OrganismFactory();

    this._dynamicItems.push(orgFact.create({ x: 8, y: 1 }));
    this._dynamicItems.push(orgFact.create({ x: 2, y: 2 }));
    this._dynamicItems.push(orgFact.create({ x: 8, y: 8 }));
    this._dynamicItems.push(orgFact.create({ x: 1, y: 2 }));
    this._dynamicItems.push(predatorFactory.create({ x: 1, y: 1 }));
    this._dynamicItems.push(predatorFactory.create({ x: 3, y: 3 }));
    return this;
  }

  private createDrawer() {
    this.chackDynamicItems();

    this._dawer = new Drawer(
      {
        shape: this._mainMap,
        dynamic: {
          items: this._dynamicItems,
          handler: new StepDynamicHandler()
        }
      }
    );
  }

  private checkMap() {
    if (!this._mainMap) this.createMainMap();
  }

  private chackDynamicItems() {
    if (!this._dynamicItems.length) this.createDynamicItems();
  }

  public start() {
    this._dawer.show();
    this._dawer.step();
  }

  public stop() {
    process.exit(0);
  }
}