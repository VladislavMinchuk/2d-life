// // import inquirer from "inquirer";
import * as readline from 'readline';
import Game from './game';
import { IGame } from './interface';

import gamePreset from "./preset/game-preset";

// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.resume();

// game.showMap();
// console.log('Press SPACE to next step >>> ');

// const gameStep = game.startStepByStep();

// process.stdin.on('keypress', (str, key) => {
//   if (key.name === 'space') {
//     gameStep();
//     console.log('Press SPACE to next step >>> ');
//     console.log('Press ESC to exit >>> ');
//   }
//   if (key.name === 'escape') {
//     console.log('EXIT');
//     process.stdin.resume();
//     process.exit();
//   }
// });

const rs = gamePreset.chooseSettings().then((settings: IGame) => {
  const game = new Game(settings);
  game.showMap();
  game.start();
});
