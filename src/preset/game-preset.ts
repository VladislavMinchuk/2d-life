import inquirer from "inquirer";
import { IGame } from "../interface";
import { IAnswer } from "../interface/preset";
import { mainSettingChoices, mapSizeChoices, dynamicItemsChoices, defaultGamePreset, itemsPositionsByMap, mapSize } from "./config";

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
        when: ({ mainSetting }) => mainSetting === 'custom',
        type: 'list',
        name: 'mapSize',
        message: 'Choose size of map',
        choices: mapSizeChoices,
      },
      {
        when: ({ mainSetting }) => mainSetting === 'custom',
        type: 'checkbox',
        message: 'Which types of dynamic items should include?',
        name: 'dynamicItems',
        choices: dynamicItemsChoices
      }
    ]);

    return this.serializeAnswer(answer);
    
  }
  
  private serializeAnswer(answer: IAnswer): IGame {
    
    if (answer.mainSetting === 'default') return defaultGamePreset;

    const size = mapSize[answer.mapSize];
    const itemPositions = itemsPositionsByMap[answer.mapSize];

    const dynamicItemsPos = answer.dynamicItems.reduce((prev, curr) => {
      if (curr === 'warrior') return Object.assign(prev, { warrior: itemPositions.warrior });
      if (curr === 'civilian') return Object.assign(prev, { civilian: itemPositions.civilian });

    }, { warrior: [], civilian: [] });
    
    return {
      mapSize: size,
      dynamicItemsPos: {
        warrior: dynamicItemsPos.warrior,
        civilian: dynamicItemsPos.civilian,
      }
    };
  };
}
