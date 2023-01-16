import { IDynamicItemWithRadar, IPosition } from "../interface"

export interface IAction {
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
  moveAction(action: IAction, singlePlayer: IDynamicItemWithRadar): IDynamicItemWithRadar;
}

export class PlayerActionService implements IPlayerActionService {
  private players: IDynamicItemWithRadar[];
  
  constructor(players: IDynamicItemWithRadar[]) {
    this.players = players;
  }

  playerAction(action: IAction) {
    // 1 - Get character by id
    const singlePlayer = this.getById(action.id)
    if (action.type === 'move') this.moveAction(action, singlePlayer);
  }

  moveAction(action: IAction, singlePlayer: IDynamicItemWithRadar): IDynamicItemWithRadar {
    // 2 -  check 'next' move
    // 3 - move
    // 4 - insert
    // 5 - move anouther items
    // 6 - update player radar
    // 7 - return player item with updated radar

    return singlePlayer;
  }

  getById(id: number) {
    return this.players.find(p => p.id === id);
  }
}