import Game from './game';
import { ISerializeAnswer } from './interface/preset';
import gamePreset from "./preset/game-preset";
import ConsoleStepService from "./services/console-step";

const rs = gamePreset.chooseSettings().then((preset: ISerializeAnswer) => {
  const game = new Game(preset.settings);
  game.showMap();

  if (!preset.isAutoSteps) {
    const stepHandler = game.startStepByStep();
    ConsoleStepService.stepHandler(stepHandler);
} else game.start();
});
