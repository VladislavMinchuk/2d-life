import inquirer from "inquirer";
import { IGame } from "../interface";
import { IAnswer, ISerializeAnswer } from "../interface/preset";
import {
  mainSettingChoices,
  mapSizeChoices,
  dynamicItemsChoices,
  defaultGamePreset,
  itemsPositionsByMap,
  mapSize,
  stepHandleChoices
} from "./config";

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
      },
      {
        when: ({ mainSetting }) => mainSetting === 'custom',
        type: 'list',
        message: 'How to handle steps?',
        name: 'stepHandle',
        choices: stepHandleChoices
      },
    ]);

    return this.serializeAnswer(answer);
  }
  
  private serializeAnswer(answer: IAnswer): ISerializeAnswer {
    
    if (answer.mainSetting === 'default') return defaultGamePreset;

    const size = mapSize[answer.mapSize];
    const itemPositions = itemsPositionsByMap[answer.mapSize];
    const isAutoStepsHandler = answer.stepHandle === 'automatically';

    const dynamicItemsPos = answer.dynamicItems.reduce((prev, curr) => {
      if (curr === 'warrior') return Object.assign(prev, { warrior: itemPositions.warrior });
      if (curr === 'civilian') return Object.assign(prev, { civilian: itemPositions.civilian });

    }, { warrior: [], civilian: [] });
    
    return {
      settings: {
        mapSize: size,
        dynamicItemsPos: {
          warrior: dynamicItemsPos.warrior,
          civilian: dynamicItemsPos.civilian,
        }
      },
      isAutoSteps: isAutoStepsHandler
    };
  };
}
