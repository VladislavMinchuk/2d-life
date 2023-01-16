export interface IShape {
  width: number;
  height: number;
  borderSymbol: string;
  spaceSymbol: string;
  shapeModel: (IShapeItem)[][];

  insertItem(position: IPosition, item: IShapeItem): IShape;
  insertSpace(position: IPosition): IShape;
  isSpace(position: IPosition): boolean;
  getShapeModel(): (IShapeItem)[][];
  getShapeSize(): { width: number, height: number };
  isPositionInsideShape(position: IPosition): boolean;
  getItemByPosition(position: IPosition): IShapeItem;
  showShape(): void;
}

export interface IShapeItem {
  x: number;
  y: number;
  symbol: string;
  id: number;

  getPosition(): IPosition;
  toString(): string;
}

export interface IDynamicShapeItem extends IShapeItem {
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
  get radarModel(): (IShapeItem)[][];
  get nextRandomMove(): IPosition;
  isAvailableMove(position: IPosition): boolean
  setOutsidePositionOwner(outsidePositionOwner: IPosition): void;
  updateRadar(iterationCb: Function): void;
}

export interface IWarriorRadar {
  get randomTarget(): IDynamicShapeItem;
  get hasTargetAround(): boolean;
  get nextRandomMove(): IPosition;
  get radarModel(): IShapeItem[][];
  isAvailableTarget(target: IShapeItem): boolean;
  setOutsidePositionOwner(outsidePositionOwner: IPosition): void;
  updateRadar(): void;
}

export interface IDynamicItemWithRadar {
  id: number;
  radar: IWarriorRadar;
  get prevStep(): IPosition;
  get currentTarget(): IDynamicShapeItem;
  set currentTarget(target: IDynamicShapeItem);
  get nextMove(): IPosition;
  getPosition(): IPosition;
  move(position: IPosition): void;
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