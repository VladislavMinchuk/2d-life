import { IDynamicItemWithRadar, IPosition, IShapeItem } from "../interface";
import { IAction } from "./player-action-service";

interface IAroundItems {
  id: number,
  position: IPosition,
  symbol: string
}

interface IPlayerResponse {
  id: number,
  radarModel: IAroundItems[][],
  positions: {
    current: IPosition,
    next: IPosition | null,
    prev: IPosition,
  }
}


export class WebPlayerService {
  serializePlayerResponse(player: IDynamicItemWithRadar): IPlayerResponse {
    return {
      id: player.id,
      radarModel: this.serializeRadarModel(player.radar.radarModel),
      positions: {
        current: player.getPosition(),
        next: null,
        prev: player.prevStep
      }
    };
  }

  // serializePlayerRequest(request: Object): IAction {
  //   return {
  //     id: request.id,
  //     positions: {
  //       current: player.getPosition(),
  //       next: null,
  //       prev: player.prevStep
  //     }
  //   };
  // }

  serializeAroundItems(item: IShapeItem): IAroundItems {
    return {
      id: item.id,
      position: item.getPosition(),
      symbol: item.symbol
    };
  }

  serializeRadarModel(radarModel: IShapeItem[][]): IAroundItems[][] {
    return radarModel.map(y => y.map(x => {
      if (typeof x === 'string') return x;

      return { id: x.id, position: x.getPosition(), symbol: x.symbol }
    }));
  }
}