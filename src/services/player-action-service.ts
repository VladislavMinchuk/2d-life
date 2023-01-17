import { IDynamicItemWithRadar, IPosition } from "../interface"

export interface IAction {
  type: string, // move
  id: number,
  positions: {
    next: IPosition,
    prev: IPosition,
  }
}

export interface IPlayerActionService {
  player: IDynamicItemWithRadar;
  playerAction(action: IAction): void;
  updatePlayerRadar(): IDynamicItemWithRadar;
}

export class PlayerActionService implements IPlayerActionService {
  public player: IDynamicItemWithRadar;
  
  constructor(player: IDynamicItemWithRadar) {
    this.player = player;
  }

  playerAction(action: IAction) {
    // 1 - Check character by id
    if (!this.checkPlayerById(action.id)) return;
    if (action.type === 'move') this.moveAction(action);
  }

  moveAction(action: IAction): IDynamicItemWithRadar {
    // 6 - update player radar
    this.player.radar.updateRadar();
    // 2 - check 'next' move
    this.player.radar.isAvailableMove(action.positions.next);
    // 3 - move
    this.player.move(action.positions.next);
    // 4 - insert
    // 5 - move anouther items
    // 6 - update player radar
    // 7 - return player item with updated radar
    return this.player;
  }
  
  updatePlayerRadar(): IDynamicItemWithRadar {
    this.player.radar.updateRadar();
    return this.player;
  }

  checkPlayerById(id: number) {
    return this.player.id === id;
  }
}