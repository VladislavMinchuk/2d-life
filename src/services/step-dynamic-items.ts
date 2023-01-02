import { IDynamicShapeItem, IPosition, IShape, IStepDynamicService } from "../interface";
import { Organism } from "../items/organism";
import { Predator } from "../items/predator";

export default class StepDynamicHandler implements IStepDynamicService {
  public getNextMoveForShapeItem(element: IDynamicShapeItem, shape: IShape): IPosition {
    let nextMove: IPosition = element.nextMove;

    // Attack action if Predator has target
    if (element instanceof Predator && element.currentTarget) this.attackPredator(element, nextMove);

    // Next move should be a free space only for Organism
    if (element instanceof Organism && !shape.isSpace(nextMove)) {
      nextMove = element.prevStep
    }

    // Step back if nextMove is outside position
    if (!shape.isPositionInsideShape(nextMove)) nextMove = element.prevStep;

    return nextMove;
  }

  public getAliveItems(elements: IDynamicShapeItem[]): IDynamicShapeItem[] {
    return elements.filter((e) => !e.isDead);
  }

  private attackPredator(element: Predator, nextMove: IPosition) {
    const { x: targetX, y: targetY } = element.currentTarget.getPosition();
    const { x: nextX, y: nextY } = nextMove;

    if (nextX === targetX && nextY === targetY) this.killItem(element.currentTarget);
  }

  private killItem(item: IDynamicShapeItem) {
    item.isDead = true;
  }
}