import inquirer from "inquirer";
import { IGame } from "../interface";
import { IAnswer } from "../interface/preset";
import { mainSettingChoices, mapSizeChoices, dynamicItemsChoices, defaultGamePreset } from "./config";

export default new class GamePreset {
  async chooseSettings() {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'mainSetting',
        message: 'Which type of settings?',
        choices: mainSettingChoices,
      },
      {
        when: ({ mainSetting }) => {
          return mainSetting === 'custom';
        },
        type: 'list',
        name: 'mapSize',
        message: 'Choose size of map',
        choices: mapSizeChoices,
      },
      {
        when: ({ mainSetting }) => {
          return mainSetting === 'custom';
        },
        type: 'checkbox',
        message: 'Which types of dynamic items should include?',
        name: 'dynamicItems',
        choices: dynamicItemsChoices
      }
    ]);

    return this.serializeAnswer(answer);
    
  }
  
  private serializeAnswer(answer: IAnswer): IGame {
    let result = {};

    if (!answer.mapSize) return defaultGamePreset;

    return {
      mapSize: { width: 10, height: 10 },
      dynamicItemsPos: {
        warrior: [],
        civilian: []
      }
    };
  };
}