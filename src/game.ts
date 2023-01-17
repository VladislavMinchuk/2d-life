import { Drawer } from "./drawer";
import { Shape } from "./shapes/shape";
import WarriorFactory from "./factories/warrior-factory";
import CivilianFactory from "./factories/civilian-factory";
import StepDynamicHandler from "./services/step-dynamic-items";
import { IDrawer, IDynamicShapeItem, IShape, IGame, IPosition, IShapeSize, IDynamicItemWithRadar } from "./interface";
import { IAction, IPlayerActionService, PlayerActionService } from "./services/player-action-service";

export default class Game {
  private mainMap: IShape;
  private dynamicItems: IDynamicShapeItem[];
  private dawer: IDrawer;
  private mapSize: IShapeSize;
  private warriorPositions: IPosition[];
  private civilianPositions: IPosition[];
  private playerActionService: IPlayerActionService;

  constructor ({ mapSize, dynamicItemsPos: { warrior, civilian } }: IGame) {
    this.dynamicItems = [];
    this.mapSize = mapSize;
    this.warriorPositions = warrior;
    this.civilianPositions = civilian;

    this.createMainMap().createDynamicItems().createDrawer();

    return this;
  }

  // Static size
  private createMainMap() {
    this.mainMap = new Shape(this.mapSize); // The Shape depends on DecorItemFactory
    return this;
  }
  // Static date
  private createDynamicItems() {
    this.checkMap();

    const warriorFactory = new WarriorFactory(this.mainMap);
    const civilFact = new CivilianFactory();

    this.playerActionService = new PlayerActionService(warriorFactory.create({ x: 1, y: 1 }));

    const warriors = this.warriorPositions.map(pos => warriorFactory.create(pos));
    const civilians = this.civilianPositions.map(pos => civilFact.create(pos));

    this.dynamicItems.push(...civilians, ...warriors);
    return this;
  }

  private createDrawer() {
    this.chackDynamicItems();

    this.dawer = new Drawer(
      {
        shape: this.mainMap,
        dynamic: {
          items: this.dynamicItems,
          handler: new StepDynamicHandler()
        },
        singlePlayer: this.playerActionService.player,
      }
    );
  }

  private checkMap() {
    if (!this.mainMap) this.createMainMap();
  }

  private chackDynamicItems() {
    if (!this.dynamicItems.length) this.createDynamicItems();
  }

  public start() {
    this.dawer.show();
    this.dawer.step();
  }
  
  public showMap() {
    this.dawer.show();
  }

  public stop() {
    process.exit(0);
  }
  // Should remove
  public startStepByStep(): Function {
    let index = 0;

    return () => {
      // Handle here
      if (index >= this.dawer.shapeItems.length) index = 0; // Reset index
      
      let element = this.dawer.shapeItems[index];
      
      this.dawer.clearConsoleAndScrollbackBuffer();
      this.dawer.stepSinglItem(element);
      this.dawer.filterShapeItems();
      
      index++;
    };
  }
  
  public singleStepIteration(): Function {
    let index = 0;

    return (cb: Function) => {
      const intervalId = setInterval(() => {
        let element = this.dawer.shapeItems[index];

        if (!element) {
          index = 0; // Reset
          cb(); // CallBack after each iteration
          return clearInterval(intervalId); // Stop
        }

        this.dawer.clearConsoleAndScrollbackBuffer();
        this.dawer.stepSinglItem(element);
        this.dawer.filterShapeItems();
        
        index++;
      }, 500)
    }
  }

  public playerStep(action: IAction): IDynamicItemWithRadar {
    this.playerActionService.playerAction(action);
    // 4 - insert
    // 5 - move anouther items
    // 6 - update player radar
    // 7 - return player item with updated radar
    return this.playerActionService.player;
  }
}