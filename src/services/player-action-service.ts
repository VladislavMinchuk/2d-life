import { IPosition } from "../interface"

interface IAction {
  type: string, // move
  id: number,
  positions: {
    current: IPosition,
    next: IPosition,
    prev: IPosition,
  }
}

interface IPlayerActionService {

  playerAction(action: IAction)
  moveAction(action: IAction)
}

export class PlayerActionService implements IPlayerActionService {
  constructor(parameters) {
    
  }

  playerAction(action: IAction) {
    // 1 - Get character by id
    if (action.type === 'move') this.moveAction(action);
  }

  moveAction(action: IAction) {
    // 2 -  check 'next' move
    // 3 - move
    // 4 - insert
    // 5 - move anouther items
    // 6 - update player radar
    // 7 - return player item with updated radar
  }
}