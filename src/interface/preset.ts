import { IGame } from ".";

export interface IAnswer {
  mainSetting: string,
  mapSize: string,
  dynamicItems: string[],
  stepHandle: string,
};

export interface ISerializeAnswer {
  settings: IGame,
  isAutoSteps: boolean,
};
