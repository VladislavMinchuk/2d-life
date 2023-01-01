import { IDynamicShapeItem, IPosition, IShape, IStepDynamicHandler } from "../interface";
import { Organism } from "../items/organism";
import { Predator } from "../items/predator";

export default class StepDynamicHandler implements IStepDynamicHandler {
  public getNextMoveForShapeItem(item: IDynamicShapeItem, shape: IShape): IPosition {
    let nextMove: IPosition = item.nextMove;

    // Attack action if Predator has target
    if (item instanceof Predator && item.currentTarget) this.attackPredator(item, nextMove);

    // Next move should be a free space only for Organism
    if (item instanceof Organism && !shape.isSpace(nextMove)) {
      nextMove = item.prevStep
    }

    // Step back if nextMove is outside position
    if (!shape.isPositionInsideShape(nextMove)) nextMove = item.prevStep;

    return nextMove;
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