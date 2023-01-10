import Game from './game';
import { IGame } from './interface';
import gamePreset from "./preset/game-preset";
import ConsoleStepService from "./services/console-step";

const rs = gamePreset.chooseSettings().then((settings: IGame) => {
  const game = new Game(settings);
  game.showMap();
  game.start();
});
