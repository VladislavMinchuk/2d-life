export interface IShape {
  width: number;
  height: number;
  borderSymbol: string;
  spaceSymbol: string;
  shapeModel: (IShapeItem | string)[][];

  insertItem(position: IPosition, item: IShapeItem | string): IShape;
  insertSpace(position: IPosition): IShape;
  isSpace(position: IPosition): boolean;
  getShapeModel(): (IShapeItem | string)[][];
  getShapeSize(): { width: number, height: number };
  isPositionInsideShape(position: IPosition): boolean;
  getItemByPosition(position: IPosition): IShapeItem | string;
  showShape(): void;
}

export interface IShapeItem {
  x: number;
  y: number;
  symbol: string;

  getPosition(): IPosition;
  toString(): string;
}

export interface IDynamicShapeItem extends IShapeItem {
  id: number;
  positionsAround: Array<IPosition>;
  isDead: boolean;
  _prevStep: IPosition;
  _isDead: boolean;

  get prevStep(): IPosition;
  set prevStep(position: IPosition);
  get nextMove(): IPosition;
  get around(): Array<IPosition>;
  get fullAround(): Array<IPosition>;
  setPositionsAround(maxBorder: number): void;
  move(position: IPosition): void;
}

export interface IDrawer {
  shapeInstance: IShape;
  shapeItems: IDynamicShapeItem[];
  dynamicItemsService: IStepDynamicService;

  show(): void;
  step(): void;
  clearConsoleAndScrollbackBuffer(): void;
  filterShapeItems(): void;
  stepSinglItem(element: IDynamicShapeItem): void;
}

export interface IRadar {
  get radarCenter(): IPosition;
  isSpace(position: IPosition): boolean;
  setOutsidePositionOwner(outsidePositionOwner: IPosition): void;
  updateRadar(iterationCb: Function): void;
}

export interface IWarriorRadar {
  get randomTarget(): IDynamicShapeItem;
  get nextRandomMove(): IPosition;
  get hasTargetAround(): boolean;
  updateRadar(): void;
  setOutsidePositionOwner(outsidePositionOwner: IPosition): void;
}

export interface IWarrior {
  get currentTarget(): IDynamicShapeItem;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IShapeSize {
  width: number;
  height: number;
}

export interface IStepDynamicService {
  getNextMoveForShapeItem(element: IDynamicShapeItem, shape: IShape): IPosition;
  getAliveItems(elements: IDynamicShapeItem[]): IDynamicShapeItem[];
}

export interface IGame {
  mapSize: IShapeSize,
  dynamicItemsPos: {
    warrior: IPosition[],
    civilian: IPosition[],
  }
}